export function formatPopulation (population) {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export function celciusFormat (value) {
    return `${value}°C`;
}

export function dateFormat (unixDate) {
    const date = new Date(unixDate * 1000);
    const month = date.toLocaleString('default', { month: 'long' });
    const hour = date.toLocaleString('default', { hour: 'numeric', minute: 'numeric' });
    return `${date.getDate()} ${month} ${hour}`;
}

export function dateFormatOnlyDay (unixDate) {
    const date = new Date(unixDate * 1000);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.toLocaleString('default', { weekday: 'long' });
    return `${date.getDate()} ${month} ${day}`;
}

export function changeTitle (value) {
   return <title>{value} | Weather Forecast</title>
}