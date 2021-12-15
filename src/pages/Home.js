import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import async from 'async'
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getHomeState } from '../state/Home';
import getDashboardDataFromAddress from '../utils/dapp'
import useAuth from '../hooks/useAuth';

const Home = () => {
	const [ totalRewards, setTotalRewards] = useState(0)
	const [ holding, setHolding ] = useState(0)
	const [ rewardPaid, setRewardPaid ] = useState(0)
	const [ rewardPending, setRewardPending ] = useState(0)
	const [ count, setCount ] = useState(0);

	const { address } = useSelector(getHomeState)
	const { walletConnect } = useAuth()

	useEffect(() => {
		setTimeout(() => {
			async.waterfall([
				callback => {
					(async () => {
						let err, data;
						try {
							console.log("HomeBody:address=", address)
							if(address)
								data = await getDashboardDataFromAddress(address);
							else{
								setTotalRewards(0);
								setHolding(0);
								setRewardPaid(0);
								setRewardPending(0);
							}
						} catch (e) {
							err = e;
						} finally {
							callback(err, data);
						}
					})();
				}
			], (err, data) => {
				if (err) {
					console.log('Dapp failed with the following error:');
					console.error(err);
				} else {
					console.log("data: ", data)
					if(data){
						console.log('Dapp succeeded!');
						console.log("Holding = ", data.holding)
						setHolding(data.holding)
						console.log("USDT Paid = ", data.rewardPaid);
						setRewardPaid(data.rewardPaid)
						console.log("USDT Pending = ", data.rewardPending);
						setRewardPending(data.rewardPending)
						console.log("Total Rewards Paid to holders = ", data.totalRewards)
						setTotalRewards(data.totalRewards)
					}
				}
			})
			setCount(count + 1)
		}, 3000);
		
	}, [address, count])

	return (
    <>
        {/* preloader area start */}
		<div className="preloader" id="preloader">
			<div className="loader loader-1">
				<div className="loader-outter"></div>
				<div className="loader-inner"></div>
			</div>
		</div>
		{/* preloader area end */}
		<Header />

		{/* Breadcrumb Area Start */}
		<section className="breadcrumb-area bc-dashboard">
			<img className="bc-img" src="assets/here/rewards.png" alt=""/>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<h4 className="title">
							Dashboard
						</h4>
					</div>
				</div>
			</div>
		</section>
		{/* Breadcrumb Area End */}

		{/* Dashboard Staticstics Area Start */}
		<section className="dashboard-area">
			<div className="dashboard-staticstics">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<div className="single-staticstics">
								<div className="left">
									<div className="icon">
										<img src="assets/here/st1.png" alt=""/>
									</div>
								</div>
								<div className="right">
									<h4 className="title">Total Rewards Paid</h4>
									<div className="count">
										<img src="assets/here/tikit-icon.png" alt=""/>
										<span>${totalRewards}</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="single-staticstics">
								<div className="left">
									<div className="icon">
										<img src="assets/here/st1.png" alt=""/>
									</div>
								</div>
								<div className="right">
									<h4 className="title">SLR Holding</h4>
									<div className="count">
										<img src="assets/here/tikit-icon.png" alt=""/>
										<span>{holding} SLR</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="single-staticstics">
								<div className="left">
									<div className="icon">
										<img src="assets/here/st1.png" alt=""/>
									</div>
								</div>
								<div className="right">
									<h4 className="title">USDT Paid</h4>
									<div className="count">
										<img src="assets/here/tikit-icon.png" alt=""/>
										<span>${rewardPaid}</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="single-staticstics">
								<div className="left">
									<div className="icon">
										<img src="assets/here/st1.png" alt=""/>
									</div>
								</div>
								<div className="right">
									<h4 className="title">USDT Pending</h4>
									<div className="count">
										<img src="assets/here/tikit-icon.png" alt=""/>
										<span>{rewardPending}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12 text-xl-center">
							{address ? (
								<a className="mybtn2" href={`https://bscscan.com/token/${address}`} target="_blank">All Transactions </a>
							):(
								<a className="mybtn2" onClick={walletConnect}>Connect </a>
							)}
							
						</div>
					</div>
				</div>
			</div>
			<div className="daily-dashboard">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-8 col-md-10">
							<div className="section-heading">
								<h5 className="subtitle">
									Try to check out Token Price
								</h5>
								<h2 className="title">
									<a className="chart-link" href="https://poocoin.app/tokens/0xc24796458fbea043780eea59ebba4ad40e87c29b" target="_blank">
									SLR Chart
									</a>
								</h2>
								<p className="text">
									You'll get more rewards with SLR token.
								</p>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<div className="draw-time">
								<h5 className="subtitle">
										Payout Loading:
								</h5>
								<div className="draw-counter">
										<div data-countdown="2022/6/15"></div>
								</div>
								<p className="text">
										To get more rewards
								</p>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</section>
		{/* Dashboard Staticstics  Area End */}

		<Footer />

		{/* Back to Top Start */}
		<div className="bottomtotop">
			<i className="fas fa-chevron-right"></i>
		</div>
		{/* Back to Top End */}
		
		{/* ConnectWallet Area Start */}
		<div className="modal fade login-modal sign-in" id="connectwallet" tabIndex="-1" role="dialog" aria-labelledby="connectwallet" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered " role="document">
				<div className="modal-content">
					<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<div className="modal-body">
						<div className="logo-area">
							<img className="logo" src="assets/here/logo.svg" alt="" />
						</div>
						<div className="header-area">
							<h4 className="title">Great to have you back!</h4>
							<p className="sub-title">Enter your details below.</p>
						</div>
						<div className="form-area">
							<form action="#" method="POST">
								<div className="form-group">
										<label htmlFor="input-name">Name*</label>
										<input type="text" className="input-field" id="input-name"  placeholder="Enter your Name" />
								</div>
								<div className="form-group">
										<label htmlFor="input-email">Email*</label>
										<input type="email" className="input-field" id="input-email"  placeholder="Enter your Email" />
								</div>
								<div className="form-group">
										<label htmlFor="input-password">Password*</label>
										<input type="password" className="input-field" id="input-password"  placeholder="Enter your password"/>
								</div>
								<div className="form-group">
										<label htmlFor="input-con-password">confirm password**</label>
										<input type="password" className="input-field" id="input-con-password"  placeholder="Enter your Confirm Password"/>
								</div>
								<div className="form-group">
										<select>
											<option value="0">BTC</option>
											<option value="1">USD</option>
											<option value="2">EUR</option>
										</select>
								</div>
								<div className="form-group">
									<button type="submit" className="mybtn1">Connect Wallet</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		{/* ConnectWallet Area End */}
	</>
    );
}

export default Home;