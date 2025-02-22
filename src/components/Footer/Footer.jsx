import React from 'react'
import footStyle from '../Footer/Footer.module.css'
export default function Footer() {
  return (
    <>
    <section className={`shadow p-1 ${footStyle.section}`}>
        <div className="copyright py-4 text-center text-white t-5">
                <div className="container"><small>Copyright ©2025 Map Task Abanoub Mamdouh</small></div>
            </div>
    </section>
    </>
  )
}
