import Header from "../components/Header/Header";
import Logo from "../assets/KitaabKosh_logo.svg";
import Footer from "../components/Footer/Footer";
import Govind from "/Govind.jpg";
import Tarun from "/Tarun.jpg";

export default function About() {
  return (
    <>
      <Header />
      <section className="px-8 py-10">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-full md:w-5/12">
              <div className="md:ml-2 lg:ml-5">
                <img
                  src={Logo} // Random placeholder logo URL
                  alt="Kitaabkosh Logo"
                  className="mx-auto mb-6"
                />
              </div>
            </div>
            <div className="w-full md:ml-auto md:w-6/12">
              <div className="md:ml-2 lg:ml-5">
                <span className="text-gray-500">Our Story</span>
                <h2 className="pb-6 text-4xl font-bold">About KitaabKosh</h2>
                <p className="pb-4 text-lg leading-relaxed">
                  KitaabKosh is a simple and easy-to-use book management website
                  created by a group of four students. It helps users organize,
                  track, and manage books, whether they are part of a library or
                  a personal collection. The website is designed to be
                  user-friendly, so anyone can use it without trouble.
                </p>
                <p className="mb-0 text-lg leading-relaxed">
                  One of the main features of KitaabKosh is the ability to
                  upload book details, making it easier to build and maintain a
                  catalog of books. This feature allows users to add important
                  information about their books, such as titles, authors, and
                  availability, ensuring the collection is well-organized and
                  accessible. The project aims to make managing books simple and
                  hassle-free for everyone.
                </p>
              </div>
            </div>
            <div className="w-full">
              <h2 className="mt-16 text-center text-3xl font-bold text-gray-900">
                Meet Our Team
              </h2>

              <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                <div className="transform rounded-xl bg-white p-6 text-center shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                  <img
                    src={Govind} // Replace with actual image path
                    alt="Team Member 1"
                    className="mx-auto mb-4 h-40 w-40 rounded-full border-4 border-gray-200"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Govind Singh
                  </h3>
                  <div className="mt-4 flex justify-center space-x-4">
                    <a
                      href="https://www.linkedin.com/in/govindsingh3011"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin text-2xl text-blue-700"></i>
                    </a>
                    <a
                      href="https://github.com/GovindSingh3011"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github text-2xl text-gray-900"></i>
                    </a>
                  </div>
                </div>

                <div className="transform rounded-xl bg-white p-6 text-center shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                  <img
                    src="path_to_image" // Replace with actual image path
                    alt="Team Member 2"
                    className="mx-auto mb-4 h-40 w-40 rounded-full border-4 border-gray-200"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Aman Varshney
                  </h3>
                  <div className="mt-4 flex justify-center space-x-4">
                    <a
                      href="https://www.linkedin.com/in/your-linkedin-profile"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin text-2xl text-blue-700"></i>
                    </a>
                    <a
                      href="https://github.com/AmanVarshney01"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github text-2xl text-gray-900"></i>
                    </a>
                  </div>
                </div>

                <div className="transform rounded-xl bg-white p-6 text-center shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                  <img
                    src={Tarun} // Replace with actual image path
                    alt="Team Member 3"
                    className="mx-auto mb-4 h-40 w-40 rounded-full border-4 border-gray-200"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Tarun Varshney
                  </h3>
                  <div className="mt-4 flex justify-center space-x-4">
                    <a
                      href="https://www.linkedin.com/in/tarun-varshney-051380191/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin text-2xl text-blue-700"></i>
                    </a>
                    <a
                      href="https://github.com/tarun6546"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github text-2xl text-gray-900"></i>
                    </a>
                  </div>
                </div>

                <div className="transform rounded-xl bg-white p-6 text-center shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                  <img
                    src="path_to_image" // Replace with actual image path
                    alt="Team Member 4"
                    className="mx-auto mb-4 h-40 w-40 rounded-full border-4 border-gray-200"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Aditya Shankar
                  </h3>
                  <div className="mt-4 flex justify-center space-x-4">
                    <a
                      href="https://www.linkedin.com/in/your-linkedin-profile"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin text-2xl text-blue-700"></i>
                    </a>
                    <a
                      href="https://github.com/Aditya56Shankar"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github text-2xl text-gray-900"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
