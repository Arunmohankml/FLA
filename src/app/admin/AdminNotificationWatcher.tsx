"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineBell, HiOutlineX } from "react-icons/hi";
import { useAuth } from "@/components/AuthContext";

type AdminNotificationItem = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  url: string;
};

type PushState = "idle" | "enabling" | "enabled" | "error";

const SEEN_STORAGE_KEY = "fla-admin-notifications-seen";
const POLL_INTERVAL_MS = 30000;
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY || "";

function supportsNotifications() {
  return typeof window !== "undefined" && "Notification" in window;
}

function supportsPush() {
  return (
    supportsNotifications() &&
    "serviceWorker" in navigator &&
    "PushManager" in window
  );
}

function urlBase64ToUint8Array(value: string) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  return Uint8Array.from(Array.from(raw, (character) => character.charCodeAt(0)));
}

function loadSeenIds() {
  if (typeof window === "undefined") return new Set<string>();

  try {
    const stored = window.localStorage.getItem(SEEN_STORAGE_KEY);
    const parsed = stored ? (JSON.parse(stored) as string[]) : [];
    return new Set(parsed.filter(Boolean));
  } catch {
    return new Set<string>();
  }
}

function saveSeenIds(ids: Set<string>) {
  const latest = Array.from(ids).slice(-120);
  window.localStorage.setItem(SEEN_STORAGE_KEY, JSON.stringify(latest));
}

export function AdminNotificationWatcher() {
  const { user, isAdmin } = useAuth();
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">(
    () => (supportsNotifications() ? Notification.permission : "unsupported"),
  );
  const [pushState, setPushState] = useState<PushState>("idle");
  const [pushError, setPushError] = useState("");
  const [toast, setToast] = useState<AdminNotificationItem | null>(null);
  const seenIds = useRef<Set<string> | null>(null);
  const initialized = useRef(false);

  const canPoll = useMemo(
    () => Boolean(user && isAdmin && permission !== "unsupported"),
    [user, isAdmin, permission],
  );

  const enablePush = useCallback(
    async (requestPermission: boolean) => {
      if (!user) return;
      if (!supportsPush()) {
        setPermission("unsupported");
        return;
      }
      if (!VAPID_PUBLIC_KEY) {
        setPushState("error");
        setPushError("Push notifications are not configured on the server yet.");
        return;
      }

      setPushState("enabling");
      setPushError("");

      try {
        let nextPermission = Notification.permission;
        if (nextPermission === "default" && requestPermission) {
          nextPermission = await Notification.requestPermission();
        }
        setPermission(nextPermission);

        if (nextPermission !== "granted") {
          setPushState(nextPermission === "denied" ? "error" : "idle");
          if (nextPermission === "denied") {
            setPushError("Notifications are blocked. Allow them in this site's browser settings.");
          }
          return;
        }

        const registration = await navigator.serviceWorker.register("/admin-push-sw.js");
        let subscription = await registration.pushManager.getSubscription();
        if (!subscription) {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
          });
        }

        const token = await user.getIdToken();
        const response = await fetch("/api/admin/push-subscriptions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription.toJSON()),
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(data.error || "Could not save the push subscription.");
        }

        setPushState("enabled");
      } catch (error) {
        setPushState("error");
        setPushError(
          error instanceof Error ? error.message : "Could not enable push notifications.",
        );
      }
    },
    [user],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      seenIds.current = loadSeenIds();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!user || permission !== "granted" || pushState !== "idle") return;
    const timer = window.setTimeout(() => void enablePush(false), 0);
    return () => window.clearTimeout(timer);
  }, [enablePush, permission, pushState, user]);

  useEffect(() => {
    if (!canPoll || !user) return;

    const poll = async () => {
      try {
        const token = await user.getIdToken();
        const response = await fetch("/api/admin/notifications", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        if (!response.ok) return;

        const data = (await response.json()) as { items?: AdminNotificationItem[] };
        const items = data.items ?? [];
        const currentSeen = seenIds.current ?? new Set<string>();

        if (!initialized.current) {
          items.forEach((item) => currentSeen.add(item.id));
          seenIds.current = currentSeen;
          saveSeenIds(currentSeen);
          initialized.current = true;
          return;
        }

        const freshItems = items
          .filter((item) => !currentSeen.has(item.id))
          .sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          );

        for (const item of freshItems) {
          currentSeen.add(item.id);
          setToast(item);
        }

        if (freshItems.length > 0) {
          seenIds.current = currentSeen;
          saveSeenIds(currentSeen);
        }
      } catch {
        // Polling should never interrupt admin work.
      }
    };

    void poll();
    const timer = window.setInterval(poll, POLL_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [canPoll, user]);

  if (!isAdmin || permission === "unsupported") return null;

  const showSetup = permission !== "granted" || pushState !== "enabled";
  const permissionBlocked = permission === "denied";

  return (
    <>
      {showSetup && (
        <div
          className="fixed right-4 top-20 z-50 max-w-[calc(100vw-2rem)] rounded-xl border border-[#DCE8F5] bg-white p-4 text-[#0F172A] shadow-[0_10px_30px_rgba(12,40,71,0.12)] sm:right-6 sm:max-w-sm"
          role="status"
          aria-live="polite"
        >
          <div className="flex gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0c2847]">
              <HiOutlineBell className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold">
                {permissionBlocked ? "Admin notifications are blocked" : "Enable admin notifications"}
              </p>
              <p className="mt-1 text-sm leading-5 text-[#475569]">
                {permissionBlocked
                  ? "Open this site's browser settings and allow notifications, then reload the admin panel."
                  : "Get push alerts when a new enquiry, registration, demo booking, or job application arrives, even when the admin panel is closed."}
              </p>
              {pushError && (
                <p className="mt-2 text-sm font-medium text-red-700" role="alert">
                  {pushError}
                </p>
              )}
              {!permissionBlocked && (
                <button
                  type="button"
                  onClick={() => void enablePush(true)}
                  disabled={pushState === "enabling"}
                  className="mt-3 min-h-11 cursor-pointer rounded-lg bg-[#0c2847] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#172c55] focus:outline-none focus:ring-2 focus:ring-[#172c55] focus:ring-offset-2 disabled:cursor-wait disabled:opacity-65"
                >
                  {pushState === "enabling" ? "Enabling..." : "Allow notifications"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          className="fixed right-4 top-20 z-50 max-w-[calc(100vw-2rem)] rounded-xl border border-[#DCE8F5] bg-white p-4 text-[#0F172A] shadow-[0_10px_30px_rgba(12,40,71,0.12)] sm:right-6 sm:max-w-sm"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0c2847]">
              <HiOutlineBell className="size-5" />
            </div>
            <a href={toast.url} className="min-w-0 flex-1">
              <p className="text-sm font-bold">{toast.title}</p>
              {toast.body && <p className="mt-1 text-sm text-[#475569]">{toast.body}</p>}
            </a>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#64748B] transition-colors hover:bg-[#F5FAFF] hover:text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#172c55] focus:ring-offset-2"
              aria-label="Dismiss notification"
            >
              <HiOutlineX className="size-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
