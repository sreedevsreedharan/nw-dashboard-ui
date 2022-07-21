import React from "react";
import { useEffect } from "react";
import { Modal } from 'bootstrap';
import './Spinner.scss';

const Spinner = () => {

    useEffect(() => {
        let myModal = new Modal(document.getElementById('spinnerModal'));
        myModal.show();
        return () => {
            myModal.hide();
        };
    }, []);

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