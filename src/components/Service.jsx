const services = [
  {
    title: "Freelance Web Development",
    description:
      "Available for freelance and contract-based projects. I help businesses build modern web applications using React.js and related technologies.",
  },
  {
    title: "Existing Project Support & Maintenance",
    description:
      "Providing bug fixes, feature development, and ongoing support for existing applications to help you scale and improve.",
  },
  {
    title: "Custom Web Application Development",
    description:
      "I build responsive, scalable, and interactive web applications tailored to your business needs using React.js.",
  },
  {
    title: "Deployment & Hosting on AWS & Firebase",
    description:
      "Deploying applications on AWS (EC2, S3, Amplify) and Firebase Hosting for secure, scalable, and production-ready environments, including server setup, domain configuration, SSL, and CI/CD pipelines.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-10 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">My Services</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {services?.map((service, index) => (
            <div
              key={index}
              className="p-5 border border-white/10 rounded-xl bg-secondary hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-neutral-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
