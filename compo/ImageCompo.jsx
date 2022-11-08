import Image from 'next/image'
import React, { useEffect } from 'react'
export function getImgUrl(imgurl) {
    console.log(imgurl);
    let src = imgurl?.data?.[0]?.attributes?.formats;
    console.log(src);
    // smaple - i.attributes.Imgs.data[0].attributes.formats.large.url
    // check possible url of large,smaill,medium and thubmnail image

    if (src?.large?.url) {
        return src.large.url
    }
    if (src?.small?.url) {
        return src.small.url
    }
    if (src?.medium?.url) {
        return src.medium.url
    }
    if (src?.thumbnail?.url) {
        return src.thumbnail.url
    }
    return 'https://source.unsplash.com/random/500x500'


}
export const ImageCompo = ({ src, className, width, height, layout, alt }) => {



    // useEffect(() => {
    //     console.log(src)

    // }, [])


    return (
        <Image
            loading='lazy'
            // src={`https://strapi-meshv.herokuapp.com${getImgUrl(src)} || '/images/placeholder.png'`}

            src={getImgUrl(src)}
            alt={alt || 'image'}
            className={`"${className || 'w-full h-full object-center object-cover'}  "`}
            // {
            // ...layout && { layout }

            // }

            // layout={layout || 'fill'}
            // check width and height
            {
            ...width && { width }

            }
            {
            ...height && { height }
            }
        />

    )
}
