import React, { useState } from 'react';
import { loadStudents, saveStudents } from './dataUtils';
import StudentTable from './components/StudentTable';
import StudentModal from './components/StudentModal';
import './App.css';

function App() {
  // Customized baseline student profile map initializer
  const getInitialStudents = () => {
    const savedData = loadStudents();
    // If the storage block is empty, initialize it with your specified student names list
    if (!savedData || savedData.length === 0) {
      const defaultList = [
        { id: "STU-2026-401", name: "Mathe", email: "mathe@limkokwing.ac.ls", course: "Business Info Tech" },
        { id: "STU-2026-402", name: "Julia", email: "julia@limkokwing.ac.ls", course: "Business Info Tech" },
        { id: "STU-2026-403", name: "Tholoana", email: "tholoana@limkokwing.ac.ls", course: "Business Info Tech" },
        { id: "STU-2026-404", name: "Boitumelo", email: "boitumelo@limkokwing.ac.ls", course: "Business Info Tech" },
        { id: "STU-2026-405", name: "Seithati", email: "seithati@limkokwing.ac.ls", course: "Business Info Tech" },
        { id: "STU-2026-406", name: "Kekeletso", email: "kekeletso@limkokwing.ac.ls", course: "Business Info Tech" }
      ];
      saveStudents(defaultList);
      return defaultList;
    }
    return savedData;
  };

  // State management vectors
  const [students, setStudents] = useState(getInitialStudents());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit' | 'delete'
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Reusable tracking triggers mapping state states
  const openModal = (mode, student = null) => {
    setModalMode(mode);
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  // Reusable data application logical updates (Adds or Edits)
  const handleSaveStudent = (formData) => {
    let updatedStudentsList;

    if (modalMode === 'add') {
      const newIdString = `STU-2026-${Math.floor(100 + Math.random() * 900)}`;
      const newStudentRecord = { id: newIdString, ...formData };
      updatedStudentsList = [...students, newStudentRecord];
    } else if (modalMode === 'edit') {
      updatedStudentsList = students.map((item) => 
        item.id === selectedStudent.id ? { ...item, ...formData } : item
      );
    }

    setStudents(updatedStudentsList);
    saveStudents(updatedStudentsList);
    closeModal();
  };

  // Delete Confirmation execution handler
  const handleDeleteConfirm = (studentId) => {
    const filteredList = students.filter((item) => item.id !== studentId);
    setStudents(filteredList);
    saveStudents(filteredList);
    closeModal();
  };

  return (
    <div className="dashboard-container">
      
      {/* 1. LMS SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div className="logo">
          <h2>Limkokwing</h2>
          <p className="sidebar-campus">Lesotho Campus</p>
          <p className="sidebar-location">Maseru, Roma Mahlabatseng</p>
        </div>
        <nav className="nav-menu">
          <a href="#" className="active"><span className="icon">📊</span> Dashboard</a>
          <a href="#"><span className="icon">🧑‍🎓</span> Student Registry</a>
          <a href="#"><span className="icon">📝</span> DBIT Courses</a>
          <a href="#"><span className="icon">💳</span> Fees & Accounts</a>
          <a href="#"><span className="icon">⚙️</span> Settings</a>
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="main-content">
        
        {/* TOP HEADER STATUS PANEL */}
        <header className="top-header">
          <div className="header-brand">
            <h1>Rakoti Student Portal</h1>
            <p className="subtitle">DIWA2110 Web Application Development System</p>
          </div>
          <div className="user-profile">
            <div className="avatar">RR</div>
            <div className="user-info-text">
              <span className="user-name">Relebohile Rakoti</span>
              <span className="user-role">DBIT Specialist</span>
            </div>
          </div>
        </header>

        {/* VISUAL SHOWCASE HERO BLOCK (Student Outcome & Activities) */}
        <section className="showcase-banner">
          <div className="banner-overlay">
            <h2>Empowering Innovation & Academic Excellence</h2>
            <p>From hands-on lab training sessions to global industry tech leaders—Limkokwing DBIT students are excelling worldwide.</p>
          </div>
        </section>

        {/* 3. MODERN CARD LAYOUT WITH IMAGE PANELS */}
        <section className="visual-dashboard-grid">
          
          {/* Active Registry Status Card */}
          <div className="stat-card data-card">
            <div className="stat-card-text">
              <h3>Active DBIT Students</h3>
              <p className="stat-number">{students.length}</p>
              <span className="stat-trend positive">+4% this semester</span>
            </div>
          </div>

          {/* Student Activity Image Card (Signing & Table Discussions) */}
          <div className="stat-card image-card-activity">
            <div className="card-image-overlay">
              <h4>Collaborative Learning</h4>
              <p>Students designing systems & signing documentation live in labs.</p>
            </div>
          </div>

          {/* Student Success Image Card (Excelling Graduate Outcomes) */}
          <div className="stat-card image-card-success">
            <div className="card-image-overlay">
              <h4>Global Outcomes</h4>
              <p>Graduates excelling in modern software engineering & network fields.</p>
            </div>
          </div>

        </section>

        {/* QUICK ACTION BUTTON */}
        <div className="action-bar-row">
          <button className="btn-add-primary" onClick={() => openModal('add')}>
            + Add New Student Record
          </button>
        </div>

        {/* 4. DATA TABLE HOUSING CARD */}
        <div className="card-wrapper">
          <div className="card-header">
            <h2>Registry Records Listing</h2>
          </div>
          
          <StudentTable 
            students={students} 
            onEdit={(student) => openModal('edit', student)} 
            onDelete={(id) => openModal('delete', students.find(s => s.id === id))} 
          />
        </div>
      </main>

      {/* Mounting our unified structural layout Modal system configuration */}
      <StudentModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        studentData={selectedStudent}
        onSave={handleSaveStudent}
        onDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default App;
