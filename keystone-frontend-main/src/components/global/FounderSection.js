import pramod from "../assets/pramodfounder.png";

export default function FounderSection() {
  // new changes
  return (
    <div className="w-11/12 mx-auto ">
      <div className="relative bg-black rounded-3xl py-6 px-6 overflow-hidden">
        <div className="text-center ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFC300] leading-normal">
            Why I Founded Keystone
          </h1>
        </div>

        <div className="flex justify-center ">
          <div className="relative p-4">
            <img
              src={
                // " httpss://res.cloudinary.com/dopvfhjhs/image/upload/v1751135208/8cf1a706-7b81-4773-9ac9-33e268bfa01b.png"
                pramod
              }
              alt="Promod Sharma, Founder & CEO"
              width={300}
              height={300}
              className="rounded-lg object-cover"
              loading="eager"
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-white text-xl md:text-2xl font-medium">
            A Message from Promod Sharma, Founder & CEO
          </p>
        </div>
      </div>
    </div>
  );
}
