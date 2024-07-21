import React from 'react';
import wlcmImg from '../images/banner-img.png';
import '../scss/dashcontent.scss';
const DashContent = () => {
  return (
    <div className='das_content'>
         {/* content welcome  */}
         <div className='das_wlcm'>
                  <img src={ wlcmImg} alt='profile'/>
                  <div className='das_wlcm_text'>
                  <h1>Welcome Back</h1>
                  <h3>Amba Shakti</h3>
                  <p>Welcome to Amba Shakti.As a distinguished ISO 9001:2000, 14001, OHSAS 18001 & IS 1786 certified company, Amba Shakti Group stands as a beacon of ethical practices and quality standards within the industry.</p>
                  </div>
                 

                  </div>

                  <div className='das_about'>
                  <h1 className='das_about_h1'>About Rwtron</h1>
    <p>Hello! My name is Rwtron, and I am a passionate and dedicated web developer, specializing in creating dynamic and responsive websites, desktop applications, and mobile applications. With a robust background in the world of technology and development, I take pride in delivering high-quality digital solutions that cater to the unique needs of my clients.</p>
    
    <h2>Who I Am</h2>
    <p>As a seasoned web developer, I have honed my skills in various programming languages and frameworks over the years. My journey in this field began with a fascination for technology and a desire to create impactful digital experiences. This passion led me to explore different facets of development, from designing intuitive websites to crafting powerful desktop and mobile applications.</p>
    
    <h2>What I Do</h2>
    <h3>Web Development</h3>
    <p>My expertise in web development allows me to create websites that are not only visually appealing but also highly functional. I use a range of technologies including HTML, CSS, JavaScript, and modern frameworks such as React, Angular, and Vue.js. Whether you need a simple informational site or a complex e-commerce platform, I can build it for you with precision and attention to detail.</p>
    
    <h3>Desktop Application Development</h3>
    <p>Desktop applications require a unique set of skills, and I am well-equipped to handle this challenge. Using languages such as Java, C#, and Python, I develop robust desktop applications that are tailored to meet specific business needs. My applications are designed to be user-friendly, efficient, and scalable, ensuring that they grow with your business.</p>
    
    <h3>Mobile Application Development</h3>
    <p>In today’s mobile-first world, having a strong mobile presence is crucial. I specialize in developing mobile applications for both Android and iOS platforms. Using technologies like Swift, Kotlin, and Flutter, I create mobile apps that provide seamless user experiences and drive engagement. From concept to deployment, I handle every aspect of the mobile app development process.</p>
    
    <h2>Why Choose Me</h2>
    <h3>Experience and Expertise</h3>
    <p>With years of experience in the industry, I bring a wealth of knowledge and expertise to every project. I stay updated with the latest trends and advancements in technology, ensuring that my clients receive cutting-edge solutions.</p>
    
    <h3>Client-Centric Approach</h3>
    <p>My clients are at the heart of everything I do. I take the time to understand your vision, goals, and requirements, and I work closely with you throughout the development process. This collaborative approach ensures that the final product not only meets but exceeds your expectations.</p>
    
    <h3>Quality and Reliability</h3>
    <p>I am committed to delivering high-quality work on time and within budget. My attention to detail and commitment to excellence ensure that the solutions I provide are reliable and perform flawlessly.</p>
    
    <h3>End-to-End Solutions</h3>
    <p>From initial consultation and planning to design, development, and maintenance, I offer end-to-end solutions. This means you can rely on me for all your digital needs, knowing that I will be there to support you every step of the way.</p>
    
    <h2>Let's Connect</h2>
    <p>I am always excited to take on new challenges and help businesses achieve their digital goals. If you are looking for a reliable and skilled developer to create your website, desktop application, or mobile application, look no further. Let’s work together to bring your vision to life.</p>
    
    <p>Feel free to contact me at <a href="mailto:abhishekrwt77@gmail.com">abhishekrwt77@gmail.com</a>. I look forward to hearing from you and discussing how I can help you achieve your goals.</p>
                  </div>
      
    </div>
  )
}

export default DashContent
