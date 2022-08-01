import React from "react";
import { useEffect } from "react";
import { Modal } from 'bootstrap';
import './Spinner.scss';

const Spinner = ({showSpinner}) => {

    useEffect(() => {
        if(showSpinner){
            let myModal = new Modal(document.getElementById('spinnerModal'));
            myModal.show();
        } else{
            if (document.querySelectorAll('.modal-backdrop').length > 0) {
                document.querySelectorAll('.modal-backdrop')[0].classList.remove("modal-backdrop");
                document.getElementById('spinnerModal').hidden = true;
            }
        }
    }, [showSpinner]);

    return (
        <div class="modal fade" id="spinnerModal" tabindex="-1" role="dialog" aria-labelledby="spinnerModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content modal-content-spinner">
                    <div class="modal-body">
                        <div className="text-center mt-5 p-3">
                            <div class="spinner-grow text-dashboard" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div class="spinner-grow text-dashboard" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div class="spinner-grow text-dashboard" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div class="spinner-grow text-dashboard" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div class="spinner-grow text-dashboard" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div class="spinner-grow text-dashboard" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div class="spinner-grow text-dashboard" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div class="spinner-grow text-dashboard" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Spinner;