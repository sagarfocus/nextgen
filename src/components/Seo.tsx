import { useTranslation } from 'react-i18next';
import { SITE } from '@/content/site';

const OG_LOCALES: Record<string, string> = {
  en: 'en_US',
  es: 'es_ES',
};

export type SeoSchema = Record<string, unknown> | ReadonlyArray<Record<string, unknown>>;

export interface SeoProps {
  /** Page-specific title. Suffixed with the brand unless `noBrandSuffix` is set. */
  title?: string;
  /** Render `title` exactly as given (no brand suffix). */
  noBrandSuffix?: boolean;
  /** 155–160 char meta description. */
  description?: string;
  /** Route path (e.g. `/services/seo`). Used to compute canonical + og:url. */
  path?: string;
  /** Absolute or root-relative OG/Twitter image. Pages without an image
   *  skip OG/Twitter image meta entirely (graceful degradation — emitting
   *  a missing-asset URL would 404 in scrapers, which hurts more than
   *  no image). When `public/og-default.jpg` is added, set `DEFAULT_IMAGE`
   *  below to `/og-default.jpg`. */
  image?: string;
  /** Open Graph type. Defaults to `website`. */
  type?: 'website' | 'article' | 'profile';
  /** When true, emits `<meta name="robots" content="noindex,nofollow">`. */
  noindex?: boolean;
  /** One or many JSON-LD blocks to emit as `<script type="application/ld+json">`. */
  schema?: SeoSchema;
  /** Article-only OG fields (only used when `type="article"`). */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: readonly string[];
  };
}

const BRAND_SUFFIX = `${SITE.name}`;
/** Set to `/og-default.jpg` (or similar) once a 1200×630 image lives in `public/`. */
const DEFAULT_IMAGE: string | undefined = undefined;

const absoluteUrl = (path?: string): string => {
  if (!path) return SITE.url;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const trimmed = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${trimmed}`;
};

const composeTitle = (title?: string, noBrandSuffix?: boolean): string | undefined => {
  if (!title) return undefined;
  if (noBrandSuffix) return title;
  if (title.includes(BRAND_SUFFIX)) return title;
  return `${title} · ${BRAND_SUFFIX}`;
};

/**
 * Per-page SEO head emitter. Built on React 19 native metadata hoisting —
 * `<title>`, `<meta>`, `<link>` rendered here are automatically lifted
 * into `<head>` and de-duped against earlier defaults rendered higher
 * in the tree (e.g. the site-wide `<Seo />` in `App.tsx`).
 *
 * JSON-LD `<script>` tags are not hoisted by React; they render inline
 * where this component sits. Search engines parse them regardless of
 * head/body location.
 */
const Seo = ({
  title,
  noBrandSuffix,
  description,
  path,
  image,
  type = 'website',
  noindex,
  schema,
  article,
}: SeoProps) => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || 'en').split('-')[0];
  const ogLocale = OG_LOCALES[lang] ?? OG_LOCALES.en;
  const composedTitle = composeTitle(title, noBrandSuffix);
  const canonicalUrl = path ? absoluteUrl(path) : undefined;
  const resolvedImage = image ?? DEFAULT_IMAGE;
  const ogImageUrl = resolvedImage ? absoluteUrl(resolvedImage) : undefined;
  const schemas = schema
    ? Array.isArray(schema)
      ? (schema as ReadonlyArray<Record<string, unknown>>)
      : [schema as Record<string, unknown>]
    : [];

  return (
    <>
      {composedTitle ? <title>{composedTitle}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}

      {noindex ? <meta name="robots" content="noindex,nofollow" /> : null}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:type" content={type} />
      {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
      {composedTitle ? <meta property="og:title" content={composedTitle} /> : null}
      {description ? <meta property="og:description" content={description} /> : null}
      {ogImageUrl ? (
        <>
          <meta property="og:image" content={ogImageUrl} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      ) : null}
      <meta property="og:locale" content={ogLocale} />

      {/* Article-only OG fields */}
      {type === 'article' && article?.publishedTime ? (
        <meta property="article:published_time" content={article.publishedTime} />
      ) : null}
      {type === 'article' && article?.modifiedTime ? (
        <meta property="article:modified_time" content={article.modifiedTime} />
      ) : null}
      {type === 'article' && article?.author ? (
        <meta property="article:author" content={article.author} />
      ) : null}
      {type === 'article' && article?.section ? (
        <meta property="article:section" content={article.section} />
      ) : null}
      {type === 'article' && article?.tags
        ? article.tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)
        : null}

      {/* Twitter */}
      <meta name="twitter:card" content={ogImageUrl ? 'summary_large_image' : 'summary'} />
      {composedTitle ? <meta name="twitter:title" content={composedTitle} /> : null}
      {description ? <meta name="twitter:description" content={description} /> : null}
      {ogImageUrl ? <meta name="twitter:image" content={ogImageUrl} /> : null}

      {/* JSON-LD blocks (rendered inline; search engines parse them in body too) */}
      {schemas.map((s, i) => (
        <script
          key={`ld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
};

export default Seo;
