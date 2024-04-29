import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_C0e9cyvV.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"articles/beyond/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/articles/beyond","isIndex":false,"type":"page","pattern":"^\\/articles\\/beyond\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}],[{"content":"beyond","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/articles/beyond.astro","pathname":"/articles/beyond","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"articles/dev/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/articles/dev","isIndex":false,"type":"page","pattern":"^\\/articles\\/dev\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}],[{"content":"dev","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/articles/dev.astro","pathname":"/articles/dev","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/pageview","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/pageview\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"pageview","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/pageview.ts","pathname":"/api/pageview","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://flavien-bonvin.vercel.app/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/fbonvin/Dev/perso/flavien-bonvin/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/fbonvin/Dev/perso/flavien-bonvin/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/fbonvin/Dev/perso/flavien-bonvin/src/pages/articles/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/fbonvin/Dev/perso/flavien-bonvin/src/pages/articles/beyond.astro",{"propagation":"in-tree","containsHead":true}],["/Users/fbonvin/Dev/perso/flavien-bonvin/src/pages/articles/dev.astro",{"propagation":"in-tree","containsHead":true}],["/Users/fbonvin/Dev/perso/flavien-bonvin/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/config.ts",{"propagation":"in-tree","containsHead":false}],["/Users/fbonvin/Dev/perso/flavien-bonvin/src/components/article/article-card.astro",{"propagation":"in-tree","containsHead":false}],["/Users/fbonvin/Dev/perso/flavien-bonvin/src/components/article/article-list.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/articles/beyond@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/articles/dev@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/fbonvin/Dev/perso/flavien-bonvin/src/components/article/article-gradient.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/articles/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/fbonvin/Dev/perso/flavien-bonvin/src/layouts/article-layout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/fbonvin/Dev/perso/flavien-bonvin/src/lib/data/articles.ts",{"propagation":"in-tree","containsHead":false}],["/Users/fbonvin/Dev/perso/flavien-bonvin/src/components/article/article-recommended.astro",{"propagation":"in-tree","containsHead":false}],["/Users/fbonvin/Dev/perso/flavien-bonvin/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["/Users/fbonvin/Dev/perso/flavien-bonvin/src/layouts/seo-article.astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/api/pageview.ts":"chunks/pages/pageview_Ba0eUGKl.mjs","\u0000@astrojs-manifest":"manifest_Dh9PL4CG.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_CIPeyidV.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_6lxfyVbZ.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_BFpJgnkx.mjs","\u0000@astro-page:src/pages/api/pageview@_@ts":"chunks/pageview_BsPD-NqG.mjs","\u0000@astro-page:src/pages/articles/beyond@_@astro":"chunks/beyond_18eBy_uo.mjs","\u0000@astro-page:src/pages/articles/dev@_@astro":"chunks/dev_CZcH9NsD.mjs","\u0000@astro-page:src/pages/articles/[...slug]@_@astro":"chunks/_.._Af_bb_yo.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"chunks/rss_C3ltg7BH.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_CqFu-d94.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/amazing-nextjs-libraries-that-makes-coding-easier.md?astroContentCollectionEntry=true":"chunks/amazing-nextjs-libraries-that-makes-coding-easier_xI6o-k8q.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/data-building-strategy-for-nextjs-app.md?astroContentCollectionEntry=true":"chunks/data-building-strategy-for-nextjs-app_CZXd63wE.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/how-obsidian-improved-my-organization-at-work-and-home-first-month-review.mdx?astroContentCollectionEntry=true":"chunks/how-obsidian-improved-my-organization-at-work-and-home-first-month-review_DWGlZHlg.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/how-tana-made-me-choose-obsidian-as-my-note-taking-app-and-its-amazing.mdx?astroContentCollectionEntry=true":"chunks/how-tana-made-me-choose-obsidian-as-my-note-taking-app-and-its-amazing_rctzfwYP.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/quit-spotlight-and-alfred-10-best-raycast-extensions-for-web-developers.md?astroContentCollectionEntry=true":"chunks/quit-spotlight-and-alfred-10-best-raycast-extensions-for-web-developers_Db-JKJ5h.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/reduce-next-js-bundle.md?astroContentCollectionEntry=true":"chunks/reduce-next-js-bundle_DhP14UnE.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/what-makes-the-us-ansi-keyboard-is-the-best-layout-for-developers.mdx?astroContentCollectionEntry=true":"chunks/what-makes-the-us-ansi-keyboard-is-the-best-layout-for-developers_5qg7f2pe.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/amazing-nextjs-libraries-that-makes-coding-easier.md?astroPropagatedAssets":"chunks/amazing-nextjs-libraries-that-makes-coding-easier_C9Vk2YfI.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/data-building-strategy-for-nextjs-app.md?astroPropagatedAssets":"chunks/data-building-strategy-for-nextjs-app_BY6qQUWW.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/how-obsidian-improved-my-organization-at-work-and-home-first-month-review.mdx?astroPropagatedAssets":"chunks/how-obsidian-improved-my-organization-at-work-and-home-first-month-review_CLEtqt58.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/how-tana-made-me-choose-obsidian-as-my-note-taking-app-and-its-amazing.mdx?astroPropagatedAssets":"chunks/how-tana-made-me-choose-obsidian-as-my-note-taking-app-and-its-amazing_BnSNc4oB.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/quit-spotlight-and-alfred-10-best-raycast-extensions-for-web-developers.md?astroPropagatedAssets":"chunks/quit-spotlight-and-alfred-10-best-raycast-extensions-for-web-developers_C-Tgf4gA.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/reduce-next-js-bundle.md?astroPropagatedAssets":"chunks/reduce-next-js-bundle_D4k0xgyn.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/what-makes-the-us-ansi-keyboard-is-the-best-layout-for-developers.mdx?astroPropagatedAssets":"chunks/what-makes-the-us-ansi-keyboard-is-the-best-layout-for-developers_remtWObe.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/amazing-nextjs-libraries-that-makes-coding-easier.md":"chunks/amazing-nextjs-libraries-that-makes-coding-easier_BSi7G0Qn.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/data-building-strategy-for-nextjs-app.md":"chunks/data-building-strategy-for-nextjs-app_gD7W19ie.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/how-obsidian-improved-my-organization-at-work-and-home-first-month-review.mdx":"chunks/how-obsidian-improved-my-organization-at-work-and-home-first-month-review_VGw15SF6.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/how-tana-made-me-choose-obsidian-as-my-note-taking-app-and-its-amazing.mdx":"chunks/how-tana-made-me-choose-obsidian-as-my-note-taking-app-and-its-amazing_CfF1hbPF.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/quit-spotlight-and-alfred-10-best-raycast-extensions-for-web-developers.md":"chunks/quit-spotlight-and-alfred-10-best-raycast-extensions-for-web-developers_ZNWn7bl8.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/reduce-next-js-bundle.md":"chunks/reduce-next-js-bundle_7hwOy7uA.mjs","/Users/fbonvin/Dev/perso/flavien-bonvin/src/content/blog/what-makes-the-us-ansi-keyboard-is-the-best-layout-for-developers.mdx":"chunks/what-makes-the-us-ansi-keyboard-is-the-best-layout-for-developers_BBbLnJfJ.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.l0sNRNKZ.js","/Users/fbonvin/Dev/perso/flavien-bonvin/node_modules/@astro-community/astro-embed-vimeo/Vimeo.astro?astro&type=script&index=0&lang.ts":"_astro/Vimeo.astro_astro_type_script_index_0_lang.CgRsrQuG.js","/Users/fbonvin/Dev/perso/flavien-bonvin/node_modules/@astro-community/astro-embed-youtube/YouTube.astro?astro&type=script&index=0&lang.ts":"_astro/YouTube.astro_astro_type_script_index_0_lang.DkY74W4p.js","/astro/hoisted.js?q=0":"_astro/hoisted.BMqMAa2A.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/reduce-next-js-bundle.BydLRa-0.png","/_astro/what-makes-the-us-ansi-keyboard-is-the-best-layout-for-developers.DF61mLyt.png","/_astro/how-tana-made-me-choose-obsidian-as-my-note-taking-app-and-its-amazing.DS72aTvQ.png","/_astro/data-building-strategy-for-nextjs-app.BLnl2YLx.png","/_astro/how-obsidian-improved-my-organization-at-work-and-home-first-month-review.kQluEd5z.png","/_astro/quit-spotlight-and-alfred-10-best-raycast-extensions-for-web-developers.B9LQr9_1.png","/_astro/amazing-nextjs-libraries-that-makes-coding-easier.bi30oC9_.png","/_astro/flavien_bonvin.rCT0Q9iC.png","/_astro/space-grotesk-latin-ext-wght-normal.OnFqUBEL.woff2","/_astro/space-grotesk-latin-wght-normal.5PZORFv8.woff2","/_astro/space-grotesk-vietnamese-wght-normal.D_Q6m-an.woff2","/_astro/ia-writer-mono-latin-400-normal.T57jbau0.woff2","/_astro/bitter-latin-100-normal.BAmr34XP.woff2","/_astro/bitter-latin-400-normal.CK5C1tAA.woff2","/_astro/bitter-latin-200-normal.XrimI_QM.woff2","/_astro/bitter-latin-300-normal.D56K-uo5.woff2","/_astro/bitter-latin-500-normal.D98tXCDO.woff2","/_astro/bitter-latin-800-normal.uel1o35P.woff2","/_astro/bitter-latin-700-normal.RPqqn3kL.woff2","/_astro/bitter-latin-900-normal.gs-6JpyE.woff2","/_astro/bitter-latin-600-normal.BBb-6WfA.woff2","/_astro/flavien_bonvin_raycast_extensions.BmwHHR0_.webp","/_astro/flavien_bonvin_raycast_extension_random_data.BEOWgKfi.webp","/_astro/flavien_bonvin_raycast_extensions_mdn.B5a3Sq3q.webp","/_astro/flavien_bonvin_raycast_extensions_things.CcnBzssi.webp","/_astro/flavien_bonvin_raycast_extensions_session.B4XEEZH8.webp","/_astro/flavien_bonvin_raycast_extensions_jira.BfFSSzdN.webp","/_astro/ia-writer-mono-latin-400-normal.C_4xiObl.woff","/_astro/bitter-latin-100-normal.QB3C0onn.woff","/_astro/bitter-latin-400-normal.RTdM72zw.woff","/_astro/bitter-latin-200-normal.ByoocbEZ.woff","/_astro/bitter-latin-300-normal.CJULoAhP.woff","/_astro/bitter-latin-500-normal.93K_0jDg.woff","/_astro/bitter-latin-800-normal.CDB8ZuU9.woff","/_astro/bitter-latin-600-normal.CDOW_OVa.woff","/_astro/bitter-latin-700-normal.2tPwlLD4.woff","/_astro/bitter-latin-900-normal.karTpmzv.woff","/_astro/flavien_bonvin_ssg_process.DMjt-Z-l.webp","/_astro/flavien_bonvin_ssr_process.DaI57Y_p.webp","/_astro/flavien_bonvin_ssg_timings.Dtq8ZJLn.webp","/_astro/flavien_bonvin_client_side_rendering.CCrlZuS2.webp","/_astro/flavien_bonvin_ssr_timings.D5kCddvk.webp","/_astro/flavien_bonvin_isr_rendering.D0qHkvxP.webp","/_astro/flavien_bonvin_baseline.CQkioVAF.webp","/_astro/flavien_bonvin_isr_timings.Di537S9m.webp","/_astro/flavien_bonvin_final_table.CxBBH0zT.webp","/_astro/flavien_bonvin_05_bundle_size_analysis.BWf6Trtg.webp","/_astro/flavien_bonvin_obsidian_review_template.DWGe3LAn.webp","/_astro/flavien_bonvin_obsidian_dashboard._tiTifci.webp","/_astro/flavien_bonvin_obsidian_published.CRPmics3.webp","/_astro/flavien_bonvin_iso_keyboard.Bi5DnOeb.webp","/_astro/flavien_bonvin_keyboard_layouts.lk53_XjC.png","/_astro/flavien_bonvin_keyboard_sized.rvoqEAX5.png","/_astro/flavien_bonvin_40_keybard.CgiOAYBh.png","/_astro/about.CVQPlRNU.css","/favicon.svg","/main_og.png","/noise.svg","/robot.txt","/_astro/Vimeo.astro_astro_type_script_index_0_lang.CgRsrQuG.js","/_astro/YouTube.astro_astro_type_script_index_0_lang.DkY74W4p.js","/_astro/hoisted.BMqMAa2A.js","/404.html","/about/index.html","/articles/beyond/index.html","/articles/dev/index.html","/rss.xml","/index.html"],"buildFormat":"directory","checkOrigin":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
