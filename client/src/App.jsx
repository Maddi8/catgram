import { useEffect, useState } from "react"

async function getImages() {
  const response = await fetch("http://localhost:5178/getimages")
  const data = await response.json()
  const photos = data.photos
  return photos
}

function App() {
  const [images, setImages] = useState([])

  const newImages = (newImgs) => {
    setImages((prevImages) => [...prevImages, ...newImgs]);
  };
  

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      getImages().then((photos) => {
        newImages(photos)
      })
    }
  };

  useEffect(() => {
    getImages().then((photos) => {
      newImages(photos)
    })

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <div className="flex items-center flex-col px-8 py-4">
      <div className="flex flex-row w-full">
        <h1 className="text-3xl font-bold">Catgram</h1>
        <p className="text-sm md:text-base">Powered by <a target="_blank" href="https://www.pexels.com">Pexels</a></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[90rem] px-4 py-2 rounded-lg my-2 mx-2">  
        {images.map((image) => (
          <div key={image.id} className="w-[20rem] h-[31.5rem] md:w-[20rem] md:h-[32rem] lg:w-[28.5rem] lg:h-[40rem] my-4 shadow-md transition-all duration-200 hover:shadow-lg image-container relative">
            <a target="_blank" href={image.url}><img alt={image.alt} className="w-[20rem] h-[31.5rem] md:w-[20rem] md:h-[32rem] lg:w-[28.5rem] lg:h-[40rem] rounded-lg transition-all duration-300 hover:opacity-90 shadow-sm" src={image.src.large} loading="lazy"/></a>
            <div onClick={() => {navigator.clipboard.writeText(image.url)}} className="svg-container opacity-100 lg:opacity-0 transition-opacity duration-200 cursor-pointer absolute top-[400px] lg:top-[560px] right-4 hover:shadow-2xl hover:bg-[#c06d78] bg-[#BED1CF] rounded-full shadow-md p-4">
              <img className="w-6 h-6" src="clone.svg" alt="Copy Link" />
            </div>
            <p className="cursor-default w-fit h-fit">
              <a target="_blank" className="hover:text-[#c06d78] transition-colors" href={image.photographer_url}>{image.photographer}</a> - <a target="_blank" className="hover:text-[#c06d78] transition-colors" href={image.url}>{image.alt}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
