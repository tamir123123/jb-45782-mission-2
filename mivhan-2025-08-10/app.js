(() => {
    document.getElementById("search").addEventListener("click", async function (event) {
        event.preventDefault();
        const country = document.getElementById("country").value;
        const searchResult = await (async function (country) {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${country}/?fields=name,population,currencies,region`);
                const data = await response.json();
                if (data.status === 404) {
                    alert("Country not found");
                    return null;
                }
                return data;
            } catch (error) {
                alert("country not found");
                return;
            }
        })(country);
        let allData = `<h2>total countries found: ${searchResult.length}</h2>
            <h2>total countries population: ${searchResult.reduce((totalPop, country) => totalPop + country.population, 0)}</h2>
            <h2>average population: ${searchResult.reduce((totalPop, country) => totalPop + country.population, 0) / searchResult.length}</h2>
            <table>
            <thead>
                <tr><th>country name</th><th>number of citizens</th></tr>
            </thead>
            <tbody>`

        searchResult.forEach(country => {
            allData += `<tr><td>${country.name.common}</td><td>${country.population}</td></tr>`;
        });
        allData += `</tbody></table><br><table>
            <thead>
                <tr><th>region</th><th>number of countries</th></tr>
            </thead>
            <tbody>`;
        const regionsMap = {};
        searchResult.forEach(country => {
            const region = country.region;
            regionsMap[region] = (regionsMap[region] || 0) + 1;
        });
        const regions = [];
        for (const region in regionsMap) {
            regions.push({ region: region, count: regionsMap[region] });
        }

        regions.forEach((region) => {
            allData += `<tr><td>${region.region}</td><td>${region.count}</td></tr>`;
        });
        allData += `</tbody></table>`;
        document.getElementById("search-result").innerHTML = allData;
    })
    document.getElementById("all-countries").addEventListener("click", async function (event) {
        event.preventDefault();
        const searchResult = await (async function () {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/all/?fields=name,population,currencies,region`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching country data:", error);
            }
        })();
        let allData = `<h2>total countries found: ${searchResult.length}</h2>
            <h2>total countries population: ${searchResult.reduce((totalPop, country) => totalPop + country.population, 0)}</h2>
            <h2>average population: ${searchResult.reduce((totalPop, country) => totalPop + country.population, 0) / searchResult.length}</h2>
            <table>
            <thead>
                <tr><th>country name</th><th>number of citizens</th></tr>
            </thead>
            <tbody>`
        searchResult.forEach(country => {
            allData += `<tr><td>${country.name.common}</td><td>${country.population}</td></tr>`;
        });
        allData += `</tbody></table><br><table>
            <thead>
                <tr><th>region</th><th>number of countries</th></tr>
            </thead>
            <tbody>`;
        const regionsMap = {};
        searchResult.forEach(country => {
            const region = country.region;
            regionsMap[region] = (regionsMap[region] || 0) + 1;
        });
        const regions = [];
        for (const region in regionsMap) {
            regions.push({ region: region, count: regionsMap[region] });
        }

        regions.forEach((region) => {
            allData += `<tr><td>${region.region}</td><td>${region.count}</td></tr>`;
        });
        allData += `</tbody></table>`;
        document.getElementById("search-result").innerHTML = allData;
    });
})();
