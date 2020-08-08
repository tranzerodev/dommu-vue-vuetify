// RateUtils for dashboard timeline screen and should be imported like this:
// import { getRateForYear } from "@/rateUtils.js";
// TODO add these utils to a class so we access them line RateUtils.getRateForYear
export function getRateForYear(year) {
  return rates[year];
}

var rates = {
  1980: 0.0,
  1981: 0.0,
  1982: 0.08,
  1983: 0.12,
  1984: 0.07,
  1985: 0.16,
  1986: 0.11,
  1987: 0.23,
  1988: 0.12,
  1989: 0.09,
  1990: 0.03,
  1991: -0.02,
  1992: 0.05,
  1993: 0.03,
  1994: 0.02,
  1995: 0.04,
  1996: 0.11,
  1997: 0.12,
  1998: 0.1,
  1999: 0.14,
  2000: 0.06,
  2001: 0.17,
  2002: 0.14,
  2003: 0.12,
  2004: 0.06,
  2005: 0.05,
  2006: 0.11,
  2007: -0.01,
  2008: -0.08,
  2009: 0.08,
  2010: 0.03,
  2011: 0.07,
  2012: 0.05,
  2013: 0.05,
  2014: 0.03
};
