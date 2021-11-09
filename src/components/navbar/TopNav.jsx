import React from 'react'
import { Button } from 'reactstrap';
import { useTopNav } from '../../hooks/useTopNav';
import "./scss/topNav.scss"

const TopNav = () => {
  const { toggleSideNav } = useTopNav();
  return (
    <div className="top-nav">
      <div className="hamburger-wrapper" onClick={toggleSideNav} >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="link-wrapper">
        <a href="javascript">Visit Site</a>
      </div>
    </div>
  )
}

export default TopNav