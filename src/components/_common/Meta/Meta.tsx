import Head from 'next/head';
import { useRouter } from 'next/router';
import { defaultMetaDescription, defaultMetaImage, defaultMetaTitle } from './constants';
import { MetaProps } from './types';

export function Meta({
  title = defaultMetaTitle,
  description = defaultMetaDescription,
  image = defaultMetaImage, // important: This must be an absolute URL. // note: Confirm if possible with process.env.VARIABLE
  noIndex = false
}: MetaProps) {
  const metaTitle = title || defaultMetaTitle;
  const metaDescription = description || defaultMetaDescription;
  const metaImageUrl = image || defaultMetaImage;

  const router = useRouter();
  const canonical_url = process.env.HOST_NAME + router.pathname;

  return (
    <Head>
      {noIndex && (
        <meta name="robots" content="noarchive, nofollow, noimageindex, noindex, nosnippet" />
      )}
      <meta
        name="viewport"
        content="minimum-scale=1, maximum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
      <title key="title">{metaTitle}</title>
      <meta name="description" content={metaDescription} key="description" />
      <meta property="og:title" content={metaTitle} key="og:title" />
      <meta property="og:description" content={metaDescription} key="og:description" />
      <meta property="og:image" content={metaImageUrl} key="og:image" />
      <link rel="canonical" href={canonical_url} />
    </Head>
  );
}
