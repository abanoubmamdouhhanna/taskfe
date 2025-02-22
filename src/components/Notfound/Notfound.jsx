import React from 'react'
import notStyle from '../Notfound/Notfound.module.css'

export default function Notfound() {
    return (
        <>
        <div className={`position-relative d-flex justify-content-center text-center  align-items-center p-5 ${notStyle.st}`}>
           <div className=''>
           <h1 className='fw-bolder pb-3' >Page Not Found</h1>
            <div >
                <p>We couldn't find what you were looking for.</p>
                <p>Please contact the owner of the site that linked you to the original URL and let them know their link is broken.</p>
            </div>
           </div>
        </div>



        </>
    )
}
