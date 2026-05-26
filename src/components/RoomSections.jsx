const rooms = [
  {
    name: "LIVING ROOM",
    image: "/images/img-section1.jpg",
    className: "lg:col-span-4 lg:row-span-2",
    labelClassName: "left-0 rounded-tr-[24px]",
  },
  {
    name: "BED ROOM",
    image: "/images/img-section2.jpg",
    className: "lg:col-span-4 lg:row-span-2",
    labelClassName: "left-0 rounded-tr-[24px]",
  },
  {
    name: "KITCHEN",
    image: "/images/img-section3.png",
    className: "lg:col-span-4",
    labelClassName: "right-0 rounded-tl-[24px]",
  },
  {
    name: "KID ROOM",
    image: "/images/img-section4.jpg",
    className: "lg:col-span-4",
    labelClassName: "right-0 rounded-tl-[24px]",
  },
];

export default function RoomSections() {
  return (
    <section className="bg-white py-2">
      <div className="mx-auto grid w-[92%] gap-3 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[210px_210px]">
        {rooms.map((room) => (
          <article
            key={room.name}
            className={`group relative min-h-[210px] overflow-hidden rounded-[24px] ${room.className}`}
          >
            <img
              src={room.image}
              alt={room.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <a
              href="#"
              className={`absolute bottom-0 inline-flex min-h-[60px] min-w-[190px] items-center justify-center bg-white px-8 text-[20px] font-medium text-[#181818] ${room.labelClassName}`}
            >
              {room.name}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
