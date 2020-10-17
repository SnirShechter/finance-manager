import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { CompanyTypes, createScraper, SCRAPERS } from 'israeli-bank-scrapers'
import DataFetchingException from 'App/Exceptions/DataFetchingException'
import FinancialDatumValidator from 'App/Validators/FinancialDatumValidator'

const getDataFactory = (companyType: CompanyTypes, credentialsFields: string[]) => {
  return async function (ctx: HttpContextContract) {
    const validation = new FinancialDatumValidator(ctx, credentialsFields)
    await ctx.request.validate(validation)

    const { startDate, ...credentials } = ctx.request.only(['startDate', ...credentialsFields])

    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(new Date().getMonth() - 6)

    const scraper = createScraper({
      showBrowser: false,
      companyId: companyType,
      startDate: startDate || sixMonthsAgo,
    })

    const scrapeResult = await scraper.scrape(credentials)

    if (scrapeResult.success && typeof scrapeResult.accounts !== 'undefined') {
      return scrapeResult
    } else {
      throw new DataFetchingException()
    }
  }
}
export default class FinancialDataController {
  // Regular username + password fields
  public leumi = getDataFactory(CompanyTypes.leumi, SCRAPERS.leumi.loginFields)
  public mizrahi = getDataFactory(CompanyTypes.mizrahi, SCRAPERS.mizrahi.loginFields)
  public otsarHahayal = getDataFactory(CompanyTypes.otsarHahayal, SCRAPERS.otsarHahayal.loginFields)
  public visaCal = getDataFactory(CompanyTypes.visaCal, SCRAPERS.visaCal.loginFields)
  public max = getDataFactory(CompanyTypes.max, SCRAPERS.max.loginFields)
  public union = getDataFactory(CompanyTypes.union, SCRAPERS.union.loginFields)
  public beinleumi = getDataFactory(CompanyTypes.beinleumi, SCRAPERS.beinleumi.loginFields)
  // Special fields
  public hapoalim = getDataFactory(CompanyTypes.hapoalim, SCRAPERS.hapoalim.loginFields)
  public discount = getDataFactory(CompanyTypes.discount, SCRAPERS.discount.loginFields)
  public isracard = getDataFactory(CompanyTypes.isracard, SCRAPERS.isracard.loginFields)
  public amex = getDataFactory(CompanyTypes.amex, SCRAPERS.amex.loginFields)
}
