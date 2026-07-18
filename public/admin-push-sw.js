self.addEventListener("push", (event) => {
  let payload = {};

  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { body: event.data ? event.data.text() : "" };
  }

  const title = payload.title || "New FLA submission";
  const options = {
    body: payload.body || "Open the admin panel to view the submission.",
    icon: "/brand/icon-192.png",
    badge: "/brand/icon-192.png",
    data: { url: payload.url || "/admin" },
    tag: `fla-admin-${Date.now()}`,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const destination = new URL(event.notification.data?.url || "/admin", self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ("focus" in client) {
          if ("navigate" in client) client.navigate(destination);
          return client.focus();
        }
      }

      return self.clients.openWindow ? self.clients.openWindow(destination) : undefined;
    }),
  );
});
