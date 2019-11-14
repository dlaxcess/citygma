import React, {Fragment} from "react";

export default function CitygmaProfil(props) {

    return (
        <Fragment>
            <div>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <a href="#"
                   onClick={(e) => {
                       e.preventDefault();
                       fetch('/api/logout');

                       document.location.href="/login";
                   }}
                >logout</a>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
                <p>Profil</p>
            </div>
        </Fragment>
    );
}