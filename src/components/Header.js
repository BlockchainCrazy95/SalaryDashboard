import React from 'react'
import Logo from './Logo'
import useAuth from '../hooks/useAuth';
import getChainData, { ellipseAddress } from '../utils'
import { useSelector } from 'react-redux';
import { getHomeState } from '../state/Home';

const Header = () => {

    const { provider, web3Provider, address, chainId } = useSelector(getHomeState);
    const { walletConnect, walletDisconnect } = useAuth()
//    const chainData = getChainData(chainId)

    return (
        <>
        {/* Header Area Start  */}
        <header className="header">
            {/* Top Header Area Start */}
            <section className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="content">
                                <div className="left-content">
                                    <ul className="left-list">
                                        <li>
                                            <p>
                                                <i className="fas fa-envelope"></i>	salary@salary.com
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Top Header Area End */}
            {/*Main-Menu Area Start*/}
            <div className="mainmenu-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">                 
                            <nav className="navbar navbar-expand-lg navbar-light" style={{paddingLeft: 50}}>
                                <Logo style={{marginLeft: 50}}/>
                                <div className="collapse navbar-collapse fixed-height" id="main_menu">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="dashboard.html">Info
                                                    <div className="mr-hover-effect"></div></a>
                                        </li>
                                    </ul>
                                </div>
                                {/* data-toggle="modal" data-target="#connectwallet" */} 
                                {web3Provider ? (
                                    <a href="#" className="mybtn1"  onClick={() => walletDisconnect(provider)} >{ellipseAddress(address)}</a>
                                ) : (
                                    <a href="#" className="mybtn1"  onClick={walletConnect} > Connect</a>
                                )}
                                
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/*Main-Menu Area Start*/}
        </header>
        {/* Header Area End  */}
        </>
    )
}

export default Header