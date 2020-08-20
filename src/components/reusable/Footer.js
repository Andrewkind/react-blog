import React, { Component } from 'react' //react

/*
    Footer Component : Footer for all page

*/
export default class Footer extends Component {
    render() {
        let sticky = "";
        if (this.props.sticky === "true") {
            sticky = "sticky";
        }
        return (
            <footer className={sticky}>
                <p className="footer-p">
                    <label className="footer-label">Rebound</label>
                    <label className="footer-label">2020 &copy;</label>
                </p>
            </footer>
        )
    }
}
