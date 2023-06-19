import Image from "next/image";

const GifCard = ({
  image,
  isImageLiked,
  handleLike,
  isLast,
  columnWidth,
  lastItemRef,
}: any) => (
  <div
    ref={isLast ? lastItemRef : null}
    key={image.id}
    style={{
      gridRowEnd: `span ${Math.ceil(image.height / columnWidth)}`,
      position: "relative", // add relative position here
    }}
    className="flex justify-center"
  >
    <div
      className="absolute bottom-0 left-0 p-2 backdrop-brightness-50 flex justify-between w-full"
      style={{ zIndex: 40, height: "50px" }}
    >
      {image.username && (
        <p className="text-white text-xs font-mono mr-2 flex-grow-1 overflow-hidden">
          {image.username}
        </p>
      )}

      {image.username && <span className="pr-1 font-mono">|</span>}
      <div
        className="text-white text-xs font-mono flex-shrink-0 overflow-hidden"
        style={{ maxWidth: "calc(100% - 60px)" }} // Adjust the width as needed
      >
        {image.title}
      </div>
    </div>

    <Image src={image.image_url} width={300} height={300} alt="gif" />

    <button
      className="absolute top-0 right-0 mx-2 my-2"
      onClick={() => handleLike(image.id)}
      style={{ zIndex: 1 }} // ensure button is above the image
    >
      {isImageLiked(image.id) ? (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="red"
          >
            <path d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
          </svg>
        </div>
      ) : (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="gray"
            fill="white"
          >
            <path d="M17.867 3.493l4.133 3.444v5.127l-10 8.333-10-8.334v-5.126l4.133-3.444 5.867 3.911 5.867-3.911zm.133-2.493l-6 4-6-4-6 5v7l12 10 12-10v-7l-6-5z" />
          </svg>
        </div>
      )}
    </button>
  </div>
);

export default GifCard;
