export type View = () => string | Promise<string>;

type Route = {
  path: string;
  view: View;
  protected?: boolean;
  adminOnly?: boolean;
};

export class Router {
  private routes: Route[] = [];
  private outlet: HTMLElement;

  private appSubRoutes: Record<string, View> = {};

  constructor(outlet: HTMLElement) {
    this.outlet = outlet;
    window.addEventListener("hashchange", () => this.navigate());
  }

  register(route: Route) {
    this.routes.push(route);
  }

  registerAppSub(path: string, view: View) {
    this.appSubRoutes[path] = view;
  }

  async navigate() {
    const rawFull = location.hash.replace(/^#/, "") || "/";
    const rawPath = rawFull.split("?")[0]; // ігноруємо ?tab=...
    const role = localStorage.getItem("role") || "guest";
    const authed =
      role === "admin" ||
      role === "user" ||
      !!localStorage.getItem("auth_user_id") ||
      !!localStorage.getItem("auth_token");

    const exact = this.routes.find((r) => r.path === rawPath);
    if (exact) {
      if (exact.protected && !authed) {
        location.hash = "/login";
        return;
      }
      if (exact.adminOnly && role !== "admin") {
        location.hash = "/admin-login";
        return;
      }

      const html = await exact.view();
      this.outlet.innerHTML = typeof html === "string" ? html : "";
      document.dispatchEvent(
        new CustomEvent("view:mounted", { detail: exact.path })
      );
      return;
    }

    if (rawPath.startsWith("/app/")) {
      if (!authed) {
        location.hash = "/login";
        return;
      }

      const shell = this.routes.find((r) => r.path === "/app");
      if (!shell) return;

      const html = await shell.view();
      this.outlet.innerHTML = typeof html === "string" ? html : "";

      const sub = this.appSubRoutes[rawPath];
      const target = document.getElementById("dashContent");
      if (sub && target) target.innerHTML = (await sub()) as string;

      const tab = rawPath.split("/")[2]; 
      if (tab) sessionStorage.setItem("cabinet_tab", tab);

      document.dispatchEvent(
        new CustomEvent("view:mounted", { detail: "/app" })
      );
      return;
    }

    const route = this.routes.find((r) => r.path === "404");
    if (!route) return;

    const html = await route.view();
    this.outlet.innerHTML = typeof html === "string" ? html : "";
    document.dispatchEvent(
      new CustomEvent("view:mounted", { detail: route.path })
    );
  }
}
