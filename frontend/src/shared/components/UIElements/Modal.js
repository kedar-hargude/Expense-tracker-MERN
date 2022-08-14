import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";


/*
    props: {
        show={some useState boolean value here}
        onCancel={turn the useState value false, close the modal}
        header={heading of the modal}
    }
*/

function ModalOverlay(props){

    const content=(
        <div className="modal">
            <header className="modal__header">
                <h2>{props.header}</h2>
            </header>
            <div className="modal__content">
                {props.children}
            </div>
        </div>
    );

    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
}

export default function Modal(props){
    
    return(
        <React.Fragment>
            {props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition
                in={props.show}
                timeout={200}
                mountOnEnter
                unmountOnExit
                classNames='modal'
            >
                <ModalOverlay {...props} />
            </CSSTransition>
        </React.Fragment>
    )
}