import React from "react";
import "./Layout.scss";
import PropTypes from "prop-types";
import Topbar from "../../components/layout/topbar/Topbar";

/**
 * Class Layout
 * @author Federico Garofalo <federico.garofalo@checkbox.ar>
 */
const Layout = (props) => {
	const { children } = props;
	return (
		<>
			{/*<Mask />*/}
			<Topbar />
			<div className='main grid'>
				<>{children}</>
			</div>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.element.isRequired,
};

export default Layout;
