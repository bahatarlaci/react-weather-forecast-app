import { useEffect, useState } from "react";
import { CityService } from "../../services";
import { Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

export default function CityList() {
    const [cities, setCities] = useState([]);
    useEffect(() => {
        CityService.getCitys().then((data) => setCities(data));
    }, []);
    return (
        <>
            <Helmet>
                <title>Anasayfa | Weather Forecast</title>
            </Helmet>
            <Container>
                <h4 className="d-flex justify-content-center text-white mb-4">Şehir Listesi</h4>
                <input className="form-control d-block w-50 mx-auto" type="text" placeholder="Şehir Adı Ara" aria-label="Şehir Adı Ara" onChange={(e) => CityService.getCitysFilterForSearch(e.target.value).then((data) => setCities(data))}/>
                <Row className="gy-4 mt-2">
                {cities && cities.map((city) => (
                        <div className="col-md-3" key={city.id}>
                            <div className="card">
                                <Link to={'city/'+city.id} className="text-decoration-none">
                                    <div className="card-body">
                                        <h5 className="card-title text-dark">{city.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{city.region} Bölgesi</h6>
                                        <h6 className="card-text text-danger fw-bold mb-3">Plaka Kodu: {city.id}</h6>
                                        <button className="btn btn-outline-primary">Şehir Detayı</button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                }
                { cities.length === 0 && <h4 className="d-flex justify-content-center text-white">Şehir Bulunamadı</h4> }
                </Row>
            </Container>
        </>
    );
}
