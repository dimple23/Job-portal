/***************************************************************************************
 * File name: scraping-controller.js
 * 
 * This file scrapes job postings from dice.com and 
 * returns all the data in json format
 ***************************************************************************************/

const cheerio = require("cheerio");
//const request = require("request");

const diceJobs = async (req, res) => {
/*
    // Set parameters as variables
    const query = req.params.query;
    const location = req.params.location;

    // Run request to dice.com, replaces spaces with +
    request(`https://www.dice.com/jobs?q=${query.replace(" ", "+")}&l=${location.split(" ").join("+")}`,
        function (error, result, html) {
            // set array to store results
            const jobs = [];
            // Set cheerio to html result
            const $ = cheerio.load(html);

            // For each element with the specified class, look for text or
            // attribute to target and store
            $("div.serp-result-content").each(function (i, element) {
                // results stores targeted data into an object
                // title: targets the job title
                // link: targets a link refrence inside an attribute, adds a header
                // company: adds company name
                const results = {
                    "title": $(element).find("h3").text().trim(),
                    "link": "https://www.dice.com" + $(element).find("a.loggedInVisited").attr("href"),
                    "company": $(element).find("span.compName").text()
                };
                // push results into array
                jobs.push(results)
            });

            // returns scraped data
            // res.json(jobs);
            return res.status(200).json(jobs);
        }
    );
*/
};

// Exports object
module.exports = {
    diceJobs
}