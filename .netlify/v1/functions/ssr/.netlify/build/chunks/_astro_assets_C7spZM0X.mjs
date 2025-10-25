import { isRemotePath } from '@astrojs/internal-helpers/path';
import { w as toStyleString, A as AstroError, x as NoImageMetadata, y as FailedToFetchRemoteImageDimensions, z as ExpectedImageOptions, B as ExpectedImage, C as ExpectedNotESMImage, I as InvalidImageService, f as createAstro, c as createComponent, D as ImageMissingAlt, m as maybeRenderHead, e as addAttribute, G as spreadAttributes, d as renderTemplate, r as renderComponent, H as ExperimentalFontsNotEnabled, J as FontFamilyNotFound, u as unescapeHTML } from './astro/server_B0XwYhZu.mjs';
import { D as DEFAULT_HASH_PROPS } from './consts_NtFP2Rt2.mjs';
import '@astrojs/internal-helpers/remote';
import { t as typeHandlers, a as types } from './index_MaT6fT73.mjs';
import * as mime from 'mrmime';
import 'clsx';
/* empty css                         */

const DEFAULT_RESOLUTIONS = [
  640,
  // older and lower-end phones
  750,
  // iPhone 6-8
  828,
  // iPhone XR/11
  960,
  // older horizontal phones
  1080,
  // iPhone 6-8 Plus
  1280,
  // 720p
  1668,
  // Various iPads
  1920,
  // 1080p
  2048,
  // QXGA
  2560,
  // WQXGA
  3200,
  // QHD+
  3840,
  // 4K
  4480,
  // 4.5K
  5120,
  // 5K
  6016
  // 6K
];
const LIMITED_RESOLUTIONS = [
  640,
  // older and lower-end phones
  750,
  // iPhone 6-8
  828,
  // iPhone XR/11
  1080,
  // iPhone 6-8 Plus
  1280,
  // 720p
  1668,
  // Various iPads
  2048,
  // QXGA
  2560
  // WQXGA
];
const getWidths = ({
  width,
  layout,
  breakpoints = DEFAULT_RESOLUTIONS,
  originalWidth
}) => {
  const smallerThanOriginal = (w) => !originalWidth || w <= originalWidth;
  if (layout === "full-width") {
    return breakpoints.filter(smallerThanOriginal);
  }
  if (!width) {
    return [];
  }
  const doubleWidth = width * 2;
  const maxSize = originalWidth ? Math.min(doubleWidth, originalWidth) : doubleWidth;
  if (layout === "fixed") {
    return originalWidth && width > originalWidth ? [originalWidth] : [width, maxSize];
  }
  if (layout === "constrained") {
    return [
      // Always include the image at 1x and 2x the specified width
      width,
      doubleWidth,
      ...breakpoints
    ].filter((w) => w <= maxSize).sort((a, b) => a - b);
  }
  return [];
};
const getSizesAttribute = ({
  width,
  layout
}) => {
  if (!width || !layout) {
    return void 0;
  }
  switch (layout) {
    // If screen is wider than the max size then image width is the max size,
    // otherwise it's the width of the screen
    case "constrained":
      return `(min-width: ${width}px) ${width}px, 100vw`;
    // Image is always the same width, whatever the size of the screen
    case "fixed":
      return `${width}px`;
    // Image is always the width of the screen
    case "full-width":
      return `100vw`;
    case "none":
    default:
      return void 0;
  }
};

function isESMImportedImage(src) {
  return typeof src === "object" || typeof src === "function" && "src" in src;
}
function isRemoteImage(src) {
  return typeof src === "string";
}
async function resolveSrc(src) {
  if (typeof src === "object" && "then" in src) {
    const resource = await src;
    return resource.default ?? resource;
  }
  return src;
}

function isLocalService(service) {
  if (!service) {
    return false;
  }
  return "transform" in service;
}

function isImageMetadata(src) {
  return src.fsPath && !("fsPath" in src);
}

const cssFitValues = ["fill", "contain", "cover", "scale-down"];
function addCSSVarsToStyle(vars, styles) {
  const cssVars = Object.entries(vars).filter(([_, value]) => value !== void 0 && value !== false).map(([key, value]) => `--${key}: ${value};`).join(" ");
  if (!styles) {
    return cssVars;
  }
  const style = typeof styles === "string" ? styles : toStyleString(styles);
  return `${cssVars} ${style}`;
}

const firstBytes = /* @__PURE__ */ new Map([
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}

function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function imageMetadata(data, src) {
  let result;
  try {
    result = lookup(data);
  } catch {
    throw new AstroError({
      ...NoImageMetadata,
      message: NoImageMetadata.message(src)
    });
  }
  if (!result.height || !result.width || !result.type) {
    throw new AstroError({
      ...NoImageMetadata,
      message: NoImageMetadata.message(src)
    });
  }
  const { width, height, type, orientation } = result;
  const isPortrait = (orientation || 0) >= 5;
  return {
    width: isPortrait ? height : width,
    height: isPortrait ? width : height,
    format: type,
    orientation
  };
}

async function inferRemoteSize(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new AstroError({
      ...FailedToFetchRemoteImageDimensions,
      message: FailedToFetchRemoteImageDimensions.message(url)
    });
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done) break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = await imageMetadata(accumulatedChunks, url);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch {
      }
    }
  }
  throw new AstroError({
    ...NoImageMetadata,
    message: NoImageMetadata.message(url)
  });
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '@astrojs/netlify/image-service.js'
    ).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset) globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  if (isImageMetadata(options)) {
    throw new AstroError(ExpectedNotESMImage);
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: await resolveSrc(options.src)
  };
  let originalWidth;
  let originalHeight;
  if (options.inferSize && isRemoteImage(resolvedOptions.src) && isRemotePath(resolvedOptions.src)) {
    const result = await inferRemoteSize(resolvedOptions.src);
    resolvedOptions.width ??= result.width;
    resolvedOptions.height ??= result.height;
    originalWidth = result.width;
    originalHeight = result.height;
    delete resolvedOptions.inferSize;
  }
  const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  if (isESMImportedImage(clonedSrc)) {
    originalWidth = clonedSrc.width;
    originalHeight = clonedSrc.height;
  }
  if (originalWidth && originalHeight) {
    const aspectRatio = originalWidth / originalHeight;
    if (resolvedOptions.height && !resolvedOptions.width) {
      resolvedOptions.width = Math.round(resolvedOptions.height * aspectRatio);
    } else if (resolvedOptions.width && !resolvedOptions.height) {
      resolvedOptions.height = Math.round(resolvedOptions.width / aspectRatio);
    } else if (!resolvedOptions.width && !resolvedOptions.height) {
      resolvedOptions.width = originalWidth;
      resolvedOptions.height = originalHeight;
    }
  }
  resolvedOptions.src = clonedSrc;
  const layout = options.layout ?? imageConfig.layout ?? "none";
  if (resolvedOptions.priority) {
    resolvedOptions.loading ??= "eager";
    resolvedOptions.decoding ??= "sync";
    resolvedOptions.fetchpriority ??= "high";
    delete resolvedOptions.priority;
  } else {
    resolvedOptions.loading ??= "lazy";
    resolvedOptions.decoding ??= "async";
    resolvedOptions.fetchpriority ??= "auto";
  }
  if (layout !== "none") {
    resolvedOptions.widths ||= getWidths({
      width: resolvedOptions.width,
      layout,
      originalWidth,
      breakpoints: imageConfig.breakpoints?.length ? imageConfig.breakpoints : isLocalService(service) ? LIMITED_RESOLUTIONS : DEFAULT_RESOLUTIONS
    });
    resolvedOptions.sizes ||= getSizesAttribute({ width: resolvedOptions.width, layout });
    delete resolvedOptions.densities;
    resolvedOptions.style = addCSSVarsToStyle(
      {
        fit: cssFitValues.includes(resolvedOptions.fit ?? "") && resolvedOptions.fit,
        pos: resolvedOptions.position
      },
      resolvedOptions.style
    );
    resolvedOptions["data-astro-image"] = layout;
  }
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  const matchesValidatedTransform = (transform) => transform.width === validatedOptions.width && transform.height === validatedOptions.height && transform.format === validatedOptions.format;
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => {
      return {
        transform: srcSet.transform,
        url: matchesValidatedTransform(srcSet.transform) ? imageURL : await service.getURL(srcSet.transform, imageConfig),
        descriptor: srcSet.descriptor,
        attributes: srcSet.attributes
      };
    })
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(
      validatedOptions,
      propsToHash,
      originalFilePath
    );
    srcSets = srcSetTransforms.map((srcSet) => {
      return {
        transform: srcSet.transform,
        url: matchesValidatedTransform(srcSet.transform) ? imageURL : globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
        descriptor: srcSet.descriptor,
        attributes: srcSet.attributes
      };
    });
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$4 = createAstro("https://flavienbonvin.com");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const layout = props.layout ?? imageConfig.layout ?? "none";
  if (layout !== "none") {
    props.layout ??= imageConfig.layout;
    props.fit ??= imageConfig.objectFit ?? "cover";
    props.position ??= imageConfig.objectPosition ?? "center";
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  const { class: className, ...attributes } = { ...additionalAttributes, ...image.attributes };
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}>`;
}, "/Users/fbonvin/Developer/flavien-bonvin/node_modules/astro/components/Image.astro", void 0);

const $$Astro$3 = createAstro("https://flavienbonvin.com");
const $$ResponsiveImage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ResponsiveImage;
  const { class: className, ...props } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Image", $$Image, { ...props, "class": className })}`;
}, "/Users/fbonvin/Developer/flavien-bonvin/node_modules/astro/components/ResponsiveImage.astro", void 0);

const $$Astro$2 = createAstro("https://flavienbonvin.com");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const scopedStyleClass = props.class?.match(/\bastro-\w{8}\b/)?.[0];
  if (scopedStyleClass) {
    if (pictureAttributes.class) {
      pictureAttributes.class = `${pictureAttributes.class} ${scopedStyleClass}`;
    } else {
      pictureAttributes.class = scopedStyleClass;
    }
  }
  const layout = props.layout ?? imageConfig.layout ?? "none";
  const useResponsive = layout !== "none";
  if (useResponsive) {
    props.layout ??= imageConfig.layout;
    props.fit ??= imageConfig.objectFit ?? "cover";
    props.position ??= imageConfig.objectPosition ?? "center";
  }
  for (const key in props) {
    if (key.startsWith("data-astro-cid")) {
      pictureAttributes[key] = props[key];
    }
  }
  const originalSrc = await resolveSrc(props.src);
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({
        ...props,
        src: originalSrc,
        format,
        widths: props.widths,
        densities: props.densities
      })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(originalSrc) && specialFormatsFallback.includes(originalSrc.format)) {
    resultFallbackFormat = originalSrc.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  const { class: className, ...attributes } = {
    ...imgAdditionalAttributes,
    ...fallbackImage.attributes
  };
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths && !useResponsive ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute(mime.lookup(image.options.format ?? image.src) ?? `image/${image.options.format}`, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })}  <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}> </picture>`;
}, "/Users/fbonvin/Developer/flavien-bonvin/node_modules/astro/components/Picture.astro", void 0);

const $$Astro$1 = createAstro("https://flavienbonvin.com");
const $$ResponsivePicture = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ResponsivePicture;
  const { class: className, ...props } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Picture", $$Picture, { ...props, "class": className })}`;
}, "/Users/fbonvin/Developer/flavien-bonvin/node_modules/astro/components/ResponsivePicture.astro", void 0);

const internalConsumableMap = new Map([["--font-open-sans",{"preloadData":[{"url":"/_astro/fonts/8ac0a17c1613f105.woff2","type":"woff2","weight":"400","style":"italic","subset":"latin"},{"url":"/_astro/fonts/056d850e2a2134bc.woff2","type":"woff2","weight":"400","style":"normal","subset":"latin"}],"css":"@font-face{font-family:\"Open Sans-ebeba89dab4c4af4\";src:url(\"/_astro/fonts/8ac0a17c1613f105.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:400;font-style:italic;}@font-face{font-family:\"Open Sans-ebeba89dab4c4af4\";src:url(\"/_astro/fonts/056d850e2a2134bc.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:400;font-style:normal;}:root{--font-open-sans:\"Open Sans-ebeba89dab4c4af4\",system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto;}"}],["--font-swiss-works",{"preloadData":[{"url":"/_astro/fonts/39f3076cacca1670.woff2","type":"woff2","weight":"700","style":"normal"},{"url":"/_astro/fonts/e82531034f0098d0.woff2","type":"woff2","weight":"700","style":"italic"},{"url":"/_astro/fonts/d88d3d4dff9fda0f.woff2","type":"woff2","weight":"500","style":"normal"},{"url":"/_astro/fonts/22d5fc38bcd39c49.woff2","type":"woff2","weight":"500","style":"italic"},{"url":"/_astro/fonts/1a537d7b7c53d257.woff2","type":"woff2","weight":"400","style":"normal"},{"url":"/_astro/fonts/04fb3acd02823ca0.woff2","type":"woff2","weight":"400","style":"italic"}],"css":"@font-face{font-family:\"Swiss works-279e8299217768e6\";src:url(\"/_astro/fonts/39f3076cacca1670.woff2\") format(\"woff2\");font-display:swap;font-weight:700;font-style:normal;}@font-face{font-family:\"Swiss works-279e8299217768e6\";src:url(\"/_astro/fonts/e82531034f0098d0.woff2\") format(\"woff2\");font-display:swap;font-weight:700;font-style:italic;}@font-face{font-family:\"Swiss works-279e8299217768e6\";src:url(\"/_astro/fonts/d88d3d4dff9fda0f.woff2\") format(\"woff2\");font-display:swap;font-weight:500;font-style:normal;}@font-face{font-family:\"Swiss works-279e8299217768e6\";src:url(\"/_astro/fonts/22d5fc38bcd39c49.woff2\") format(\"woff2\");font-display:swap;font-weight:500;font-style:italic;}@font-face{font-family:\"Swiss works-279e8299217768e6\";src:url(\"/_astro/fonts/1a537d7b7c53d257.woff2\") format(\"woff2\");font-display:swap;font-weight:400;font-style:normal;}@font-face{font-family:\"Swiss works-279e8299217768e6\";src:url(\"/_astro/fonts/04fb3acd02823ca0.woff2\") format(\"woff2\");font-display:swap;font-weight:400;font-style:italic;}@font-face{font-family:\"Swiss works-279e8299217768e6 fallback: Times New Roman\";src:local(\"Times New Roman\");font-display:swap;font-weight:700;font-style:normal;size-adjust:124.0615%;ascent-override:79.4767%;descent-override:25.0682%;line-gap-override:0%;}@font-face{font-family:\"Swiss works-279e8299217768e6 fallback: Times New Roman\";src:local(\"Times New Roman\");font-display:swap;font-weight:700;font-style:italic;size-adjust:124.0615%;ascent-override:79.4767%;descent-override:25.0682%;line-gap-override:0%;}@font-face{font-family:\"Swiss works-279e8299217768e6 fallback: Times New Roman\";src:local(\"Times New Roman\");font-display:swap;font-weight:500;font-style:normal;size-adjust:124.0615%;ascent-override:79.4767%;descent-override:25.0682%;line-gap-override:0%;}@font-face{font-family:\"Swiss works-279e8299217768e6 fallback: Times New Roman\";src:local(\"Times New Roman\");font-display:swap;font-weight:500;font-style:italic;size-adjust:124.0615%;ascent-override:79.4767%;descent-override:25.0682%;line-gap-override:0%;}@font-face{font-family:\"Swiss works-279e8299217768e6 fallback: Times New Roman\";src:local(\"Times New Roman\");font-display:swap;font-weight:400;font-style:normal;size-adjust:124.0615%;ascent-override:79.4767%;descent-override:25.0682%;line-gap-override:0%;}@font-face{font-family:\"Swiss works-279e8299217768e6 fallback: Times New Roman\";src:local(\"Times New Roman\");font-display:swap;font-weight:400;font-style:italic;size-adjust:124.0615%;ascent-override:79.4767%;descent-override:25.0682%;line-gap-override:0%;}:root{--font-swiss-works:\"Swiss works-279e8299217768e6\",\"Swiss works-279e8299217768e6 fallback: Times New Roman\",Georgia,Cambria,\"Times New Roman\",Times,serif;}"}],["--font-berkeley-mono",{"preloadData":[{"url":"/_astro/fonts/074572cde07232cd.woff2","type":"woff2","weight":"400","style":"normal"}],"css":"@font-face{font-family:\"Berkeley mono-0996bd52529442e6\";src:url(\"/_astro/fonts/074572cde07232cd.woff2\") format(\"woff2\");font-display:swap;font-weight:400;font-style:normal;}@font-face{font-family:\"Berkeley mono-0996bd52529442e6 fallback: Courier New\";src:local(\"Courier New\");font-display:swap;font-weight:400;font-style:normal;size-adjust:99.9837%;ascent-override:95.6156%;descent-override:24.404%;line-gap-override:0%;}:root{--font-berkeley-mono:\"Berkeley mono-0996bd52529442e6\",\"Berkeley mono-0996bd52529442e6 fallback: Courier New\",Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace;}"}]]);
						const consumableMap = new Map([["--font-open-sans",[{"weight":"400","style":"italic","src":[{"url":"/_astro/fonts/8ac0a17c1613f105.woff2","format":"woff2"}]},{"weight":"400","style":"normal","src":[{"url":"/_astro/fonts/056d850e2a2134bc.woff2","format":"woff2"}]}]],["--font-swiss-works",[{"weight":"700","style":"normal","src":[{"url":"/_astro/fonts/39f3076cacca1670.woff2","format":"woff2"}]},{"weight":"700","style":"italic","src":[{"url":"/_astro/fonts/e82531034f0098d0.woff2","format":"woff2"}]},{"weight":"500","style":"normal","src":[{"url":"/_astro/fonts/d88d3d4dff9fda0f.woff2","format":"woff2"}]},{"weight":"500","style":"italic","src":[{"url":"/_astro/fonts/22d5fc38bcd39c49.woff2","format":"woff2"}]},{"weight":"400","style":"normal","src":[{"url":"/_astro/fonts/1a537d7b7c53d257.woff2","format":"woff2"}]},{"weight":"400","style":"italic","src":[{"url":"/_astro/fonts/04fb3acd02823ca0.woff2","format":"woff2"}]}]],["--font-berkeley-mono",[{"weight":"400","style":"normal","src":[{"url":"/_astro/fonts/074572cde07232cd.woff2","format":"woff2"}]}]]]);

const fontsMod = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  consumableMap,
  internalConsumableMap
}, Symbol.toStringTag, { value: 'Module' }));

function filterPreloads(data, preload) {
  if (!preload) {
    return null;
  }
  if (preload === true) {
    return data;
  }
  return data.filter(
    ({ weight, style, subset }) => preload.some((p) => {
      if (p.weight !== void 0 && weight !== void 0 && !checkWeight(p.weight.toString(), weight)) {
        return false;
      }
      if (p.style !== void 0 && p.style !== style) {
        return false;
      }
      if (p.subset !== void 0 && p.subset !== subset) {
        return false;
      }
      return true;
    })
  );
}
function checkWeight(input, target) {
  const trimmedInput = input.trim();
  if (trimmedInput.includes(" ")) {
    return trimmedInput === target;
  }
  if (target.includes(" ")) {
    const [a, b] = target.split(" ");
    const parsedInput = Number.parseInt(input);
    return parsedInput >= Number.parseInt(a) && parsedInput <= Number.parseInt(b);
  }
  return input === target;
}

const $$Astro = createAstro("https://flavienbonvin.com");
const $$Font = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Font;
  const { internalConsumableMap } = fontsMod;
  if (!internalConsumableMap) {
    throw new AstroError(ExperimentalFontsNotEnabled);
  }
  const { cssVariable, preload = false } = Astro2.props;
  const data = internalConsumableMap.get(cssVariable);
  if (!data) {
    throw new AstroError({
      ...FontFamilyNotFound,
      message: FontFamilyNotFound.message(cssVariable)
    });
  }
  const filteredPreloadData = filterPreloads(data.preloadData, preload);
  return renderTemplate`<style>${unescapeHTML(data.css)}</style>${filteredPreloadData?.map(({ url, type }) => renderTemplate`<link rel="preload"${addAttribute(url, "href")} as="font"${addAttribute(`font/${type}`, "type")} crossorigin>`)}`;
}, "/Users/fbonvin/Developer/flavien-bonvin/node_modules/astro/components/Font.astro", void 0);

const imageConfig = {"endpoint":{"route":"/_image"},"service":{"entrypoint":"@astrojs/netlify/image-service.js","config":{}},"domains":[],"remotePatterns":[],"layout":"constrained","responsiveStyles":true};
							const getImage = async (options) => await getImage$1(options, imageConfig);

export { $$Font as Font, $$ResponsiveImage as Image, $$ResponsivePicture as Picture, getConfiguredImageService, getImage, imageConfig, inferRemoteSize, isLocalService };
