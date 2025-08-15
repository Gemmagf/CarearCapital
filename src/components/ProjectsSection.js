import React from 'react';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: 'Producto de Calidad de Datos de Riesgo',
      description: 'Lideré la visión y desarrollo de un producto para mejorar la calidad de datos de riesgo en UBS.',
      image: 'https://via.placeholder.com/400x250/4A4A4A/FFFFFF?text=Risk+Data+Quality',
    },
    {
      id: 2,
      title: 'Dashboard de Detección de Anomalías',
      description: 'Product Owner de una herramienta clave para la detección de anomalías en datos críticos.',
      image: 'https://via.placeholder.com/400x250/6B6B6B/FFFFFF?text=Anomaly+Detection',
    },
    {
      id: 3,
      title: 'Motor de Validación Estadística',
      description: 'Gestión de un motor para la validación estadística de datos, reduciendo tiempos de proyecto en un 50%.',
      image: 'https://via.placeholder.com/400x250/8C8C8C/FFFFFF?text=Statistical+Validation',
    },
  ];

  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Proyectos Destacados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-50 rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-700 text-base">{project.description}</p>
              <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;