import React from 'react'

const Service = () => {
  const services = [{id: 1, title: 'Community Management', description: 'Manage your entire community in a single system', image: "/src/assets/icons/clubandgroups.png"},
    {id: 2, title: 'Community Management', description: 'Manage your entire community in a single system', image: "/src/assets/icons/clubandgroups.png"},
    {id: 3, title: 'Community Management', description: 'Manage your entire community in a single system', image: "/src/assets/icons/clubandgroups.png"},
  ];


  return (
    <div className='md:px-14 px-4 pt-16 max-w-screen-2xl mx-auto'>
      <div className='text-center my-8'>
        <h2 className='text-4xl text-neutral-700 font-semibold mb-2'>Our Clients</h2>
        <p className='text-neutral-700'>We have been working with some Fortune 500+ clients</p>
        <div className='my-12 flex flex-wrap justify-between items-center gap-8'>
          <img src="/src/assets/company1.png" alt="" />
          <img src="/src/assets/company2.png" alt="" />
          <img src="/src/assets/company3.png" alt="" />
          <img src="/src/assets/company4.png" alt="" />
          <img src="/src/assets/company5.png" alt="" />
          <img src="/src/assets/company6.png" alt="" />
          <img src="/src/assets/company7.png" alt="" />
        </div>
      </div>
      <div className='text-center mt-20 md:w-1/2 mx-auto'>
        <h2 className='text-4xl text-neutral-700 font-semibold mb-2'>Manage your entire community in a single system</h2>
        <p className='text-neutral-700'>Who is Nextcent suitable for?</p>
      </div>

      <div className='mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-11/12 mx-auto gap-12'>
        {
          services.map((service) => <div key={service.id} className='px-4 py-8 text-center md:w-[300px] 
                  mx-auto md:h-80 rounded-md shadow cursor-pointer hover:-translate-y-2 transition-all duration-300 flex items-center justify-center h-full'>
            <div>
              <div className='bg-[#E8F5E9] h-14 w-14 mx-auto rounded-tl-3xl rounded-br-3xl'><img src={service.image} alt="" /></div>
              <h4 className='text-2xl font-bold text-neutral-600 mb-2 px-2'>{service.title}</h4>
              <p className='text-sm text-neutral-600'>{service.description}</p>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}

export default Service
