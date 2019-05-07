import React from 'react';
import ReactModal from 'react-modal';

const LoginModal = props => (
  <div className="container">
    <ReactModal
      className="Modal"
      overlayClassName="Overlay"
      isOpen={props.isOpen}
      onRequestClose={props.handleRequestClose}
      contentLabel="Register"
      ariaHideApp={false}
      closeTimeoutMS={300}
    >
      <div className="modal-header-section">
        <button
          className="btn btn-link nav-link text-light close-button"
          onClick={props.handleRequestClose}
        >
          <i className="fas fa-times" />
        </button>
        <h2 className="font-weight-light">Log In</h2>
      </div>
      <div className="content">
        <a className="btn google-btn mr-2 ml-2" href="/auth/google">
          <i className="fab fa-google modal-icon" />
        </a>
        <a className="btn facebook-btn mr-2 ml-2" href="/auth/facebook">
          <i className="fab fa-facebook modal-icon" />
        </a>
        <p className="divider line mt-4 mb-4">or</p>
        <input
          value={props.email}
          type="email"
          className="form-control"
          onChange={e => props.updateField ('email', e.target.value)}
          placeholder="Email"
        />
        <br />
        <input
          value={props.password}
          type="password"
          className="form-control"
          onChange={e => props.updateField ('password', e.target.value)}
          placeholder="Password"
        />

        <p style={{color: 'red'}}>
          <em>
            <small>{props.errorMsg}</small>
          </em>
        </p>
        <br />
        <button onClick={props.handleLogin} className="btn btn-teal mb-4">
          Log in{' '}
          {props.isLoading &&
            <div className="spinner-border spinner-border-sm " role="status">
              <span className="sr-only">Loading...</span>
            </div>}
        </button>
      </div>
    </ReactModal>
  </div>
);

export default LoginModal;
