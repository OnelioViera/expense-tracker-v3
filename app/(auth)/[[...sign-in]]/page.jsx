import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (

    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="logo"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="hidden lg:block text-blue-600" href="#">
              <span className="sr-only">Home</span>
              <Image
                src="/logo-1.svg"
                alt="logo"
                width={80}
                height={80}
              />
            </a>
            <h1 className="text-center text-3xl font-extrabold sm:text-5xl mt-6">
        Manage Your Expenses
        <strong className="font-extrabold text-primary sm:block"> Control your Money </strong>
      </h1>

            <p className="mt-4 leading-relaxed text-center text-gray-500">
              Start Creating your budget and save tons of mmoney
            </p>
            <div className="flex text-center justify-center mt-8">
              <SignIn />

            </div>
          </div>
        </main>
      </div>
    </section>
  );
}