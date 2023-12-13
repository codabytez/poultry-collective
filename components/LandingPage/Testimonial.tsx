import { NextPage } from "next";
import Image from "next/image";
import { testimony } from "./testimony";

const Testimonial: NextPage = () => {
  return (
    <>
      <section className="mt-[150px] mb-16 py-16 bg-light-green-shade">
        <h2 className="text-H2-03 text-cod-gray-cg text-center">
          Don’t take our word for it
        </h2>
        <h3 className="text-H3-03 text-cod-gray-cg text-center pt-1">
          Trust our customers....
        </h3>
        <div className="py-10 px-6 flex flex-1 gap-8 justify-center">
          {testimony.map((testimony) => {
            return (
              <div
                key={testimony.id}
                className="rounded max-w-[378px] bg-offwhite px-6 py-9 flex flex-col justify-between gap-3 basis-[33%]"
              >
                <p className="text-MP-03 text-cod-gray-cg-500">
                  {testimony.testimony}
                </p>
                <div className="flex gap-3 justify-end items-center">
                  <Image
                    src={testimony.src}
                    width={50}
                    height={50}
                    alt={testimony.name}
                    className="rounded-full w-[50px] h-[50px] object-center object-cover"
                  />
                  <p>{testimony.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Testimonial;
