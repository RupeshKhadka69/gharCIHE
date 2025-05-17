const AboutPage = () => (
  <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold mb-4 text-center">About gharCIHE</h1>
    <p className="text-gray-700 text-lg mb-8 text-center">
      We connect CIHE students with affordable and safe housing options near campus.
    </p>

    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          "Prajwal Shrestha",
          "Manish Dhakal",
          "Priya Rijal",
          "Sadikshya Poudel",
          "Nita Bhandari",
        ].map((member, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow text-center border border-gray-100"
          >
            <h4 className="text-lg font-medium text-gray-800">{member}</h4>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AboutPage;
