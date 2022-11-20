import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CityService, WeatherService } from "../../services";
import { Container, Row } from 'react-bootstrap';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Helmet } from 'react-helmet';
import '../../style/recharts.scss';

export default function CityDetail() {
    const { id } = useParams();
    const cityId = parseInt(id);
    const [city, setCity] = useState(false);
    const [weather, setWeather] = useState(false);

    useEffect(() => {
        CityService.getCitys().then((data) => { setCity(data.find((c) => c.id === cityId)) });
    }, [cityId])

    useEffect(() => {
        if(city)
            WeatherService.getForecast(city.latitude, city.longitude).then((data) => { setWeather(data) });
    }, [city])

    const celciusFormat = (value) => {
        return `${value}°C`;
    }

    const dateFormat = (unixDate) => {
        const date = new Date(unixDate * 1000);
        const month = date.toLocaleString('default', { month: 'long' });
        const hour = date.toLocaleString('default', { hour: 'numeric', minute: 'numeric' });
        return `${date.getDate()} ${month} ${hour}`;
    }

    const dateFormatOnlyDay = (unixDate) => {
        const date = new Date(unixDate * 1000);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.toLocaleString('default', { weekday: 'long' });
        return `${date.getDate()} ${month} ${day}`;
    }
    
    //custom tooltip for chart celcius format and date format
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`${dateFormat(label)}`}</p>
              <p className="desc">{`Sıcaklık : ${celciusFormat(payload[0].value)}`}</p>
              <p className="desc">{`Hissedilen Sıcaklık : ${celciusFormat(payload[1].value)}`}</p>
              <p className="desc">{`Rüzgar Hızı : ${payload[2].value} m/s`}</p>
            </div>
          );
        }
        return null;
    }

    //helmet change title for city detail page
    const changeTitle = () => {
        if(city)
            return <title>{city.name} | Weather Forecast</title>
    }


    return (
        <>
            <Helmet>
                {changeTitle()}
            </Helmet>
            {city && weather &&
                <Container className='p-5 bg-light'>
                    <Row className='text-center'>
                        <h4 className='mb-3'>{city.id}, {city.name}, {city.region} Bölgesi</h4>
                    </Row>
                    <Row>
                        <h5 className='mb-4'>Hava Durumu Tahmini</h5>
                        {weather.daily.map((day, index) => (
                            <div key={index} className='col-lg-3 col-md-6 col-sm-12 mb-4'>
                                <div className="card">
                                    <div className="card-body">
                                        <img src={`${process.env.REACT_APP_WEATHER_ICON_URL}/${day.weather[0].icon}.png`} alt='weather' />
                                        <h5 className="card-title">{dateFormatOnlyDay(day.dt)}</h5>
                                        <p className="card-text">Sıcaklık : {celciusFormat(day.temp.day)}</p>
                                        <p className="card-text">Hissedilen Sıcaklık : {celciusFormat(day.feels_like.day)}</p>
                                        <p className="card-text">Rüzgar Hızı : {day.wind_speed} m/s</p>
                                        <p className="card-text">Nem Oranı : %{day.humidity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Row>
                    <Row>
                        <h5 className='mb-4'>Saatlik Sıcaklık Durum Grafiği</h5>
                        <ResponsiveContainer className='p-0' width="100%" height={300}>
                        <AreaChart data={weather.hourly}>
                            <CartesianGrid />
                            <XAxis dataKey='dt' fontSize={14} fontWeight={400} tickFormatter={dateFormat} formatter={dateFormat} tickMargin={15} />
                            <YAxis fontSize={14} fontWeight={500} color='#fff' tickFormatter={celciusFormat} tickMargin={10} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="temp" stroke="#ffc658" fill="#ffc658" formatter={celciusFormat}/>
                            <Area type="monotone" dataKey="feels_like" stroke="#82ca9d" fill="#82ca9d" formatter={celciusFormat} />
                            <Area type="monotone" dataKey="wind_speed" stroke="#2077b4" fill="#2077b4"/>
                        </AreaChart>
                        </ResponsiveContainer>
                    </Row>
                </Container>
            }
            {!city && !weather &&
                <Container className='pt-4 bg'>
                    <Row>
                        <h3 className='text-light mb-5'>Veriler Yükleniyor...</h3>
                    </Row>
                </Container>
            }
        </>
    );
}
