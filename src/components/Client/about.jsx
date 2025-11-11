import React from 'react'
import { Link } from 'react-router-dom'
const about = () => {
  return (
    <>
    <div className='container about'>
        <h3 className='text center mb-4 mt-4 text-center'>🧱 About Us / About This Project</h3>
        <p>Welcome to Opinion Matters Ecommerce — a modern web application built to demonstrate my skills in full-stack web development.</p>
        <p>This website is designed and developed completely by me using the MERN Stack (MongoDB, Express.js, React, Node.js).</p>
        <br />
        <h4>It features:</h4>
        <ul>
            <li>🛍️ Dynamic Product Management (Add, Edit, Delete, Update)</li>
            <li>🧩 Category-based Product Display</li>
            <li>⭐ Featured Product Highlighting</li>
            <li>🖼️ Image Management and Responsive Layout</li>
            <li>🧠 Smart Admin Panel for content and data updates</li>
            <li>👤 User & Role Management – Admin can create and manage multiple users, assigning roles and permissions for smooth workflow.</li>
        </ul>
        
        <p>The purpose of this project is to showcase my ability to build a fully functional and scalable application — from database design to frontend UI and backend API integration.</p>
        <br /><hr />
        <h4>💻 Tech Stack Used</h4>
        <ul>
            <li>Frontend: React.js, React Router, Axios, Bootstrap & External CSS</li>
            <li>Backend: Node.js, Express.js</li>
            <li>Database: MongoDB with Mongoose</li>
            <li>Tools & Libraries: React Toastify, React Slick, Context API, Axios</li>
        </ul><br />
        <hr />
        <h4>🚀 My Vision</h4>
        <p>My goal is to continue improving as a full-stack developer — creating responsive, efficient, and visually appealing web applications that solve real-world problems.</p>
        <p>If you’d like to collaborate or view more of my work, feel free to contact me or explore my GitHub portfolio.</p>
        <br /><hr />
        <h4>📞 Contact</h4>
        <p>Mobile: +971 547241907</p>
        <p>Email:- gajjudube4@gmail.com</p>
        <p>GitHub Front End Project:-<Link to={'https://github.com/Egreeb/Opinion_Matters_Ecommers_Front_End'}>https://github.com/Egreeb/Opinion_Matters_Ecommers_Front_End</Link> </p>
        <p>GitHub Back End Node Project:-<Link to={'https://github.com/Egreeb/Opinion_Matters_Ecommers'}>https://github.com/Egreeb/Opinion_Matters_Ecommers</Link> </p>
        <p>LinkedIn:- <Link to={"https://www.linkedin.com/in/gajendra-dube-6b5143198?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"}>Gajendra Dube</Link> </p><br /><br />
    </div>

    </>
  )
}

export default about
