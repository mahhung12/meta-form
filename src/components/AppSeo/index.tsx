import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';

export interface LinkTag {
  rel: string;
  href: string;
  sizes?: string;
  media?: string;
  type?: string;
  color?: string;
  keyOverride?: string;
  as?: string;
  crossOrigin?: string;
}

type AppSeoProps = {
  title?: string;
  metaDescription?: string;
  socialImageUrl?: string;
  faviconImageUrl?: string;
  additionalLinkTags?: LinkTag[];
};

const AppSeo: FC<AppSeoProps> = ({ title, metaDescription, socialImageUrl, faviconImageUrl, additionalLinkTags }) => {
  const { t } = useTranslation();

  const metaDescriptionSeo = metaDescription?.substring(0, 250);
  const defaultPreviewImage = '/images/meta-face.webp';
  const defaultTitle = 'Privacy Policy';
  const defaultMetaDescription = 'Meta support fanpage us';

  return (
    <NextSeo
      title={title || defaultTitle}
      description={metaDescriptionSeo || defaultMetaDescription}
      twitter={{
        cardType: 'summary_large_image',
      }}
      openGraph={{
        title,
        description: metaDescriptionSeo || defaultMetaDescription,
        images: [
          {
            url: socialImageUrl ? socialImageUrl : defaultPreviewImage,
            alt: title,
            width: 1200,
            height: 628,
            type: 'image/jpeg',
          },
        ],
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: faviconImageUrl || '/faviconv2.ico',
        },
        ...(additionalLinkTags && additionalLinkTags?.length > 0 ? additionalLinkTags : []),
      ]}
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'initial-scale=1.0, width=device-width, user-scalable=no',
        },
        {
          name: 'keywords',
          content: '',
        },
        {
          name: 'author',
          content: '',
        },
      ]}
      robotsProps={{
        maxSnippet: 320,
      }}
    />
  );
};

export default AppSeo;
