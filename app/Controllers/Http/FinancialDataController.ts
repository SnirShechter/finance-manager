import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { CompanyTypes, createScraper, SCRAPERS } from 'israeli-bank-scrapers'
import DataFetchingException from 'App/Exceptions/DataFetchingException'
import FinancialDatumValidator from 'App/Validators/FinancialDatumValidator'
import { validate } from '../../../lib/decorators/validate'

// A generic function used to handle all routes based on the companyType and credentialsFields
async function getData(ctx: HttpContextContract, companyType: CompanyTypes, credentialsFields: string[]) {
  const { startDate, ...credentials } = ctx.request.only(['startDate', ...credentialsFields])

  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(new Date().getMonth() - 6)

  const scraper = createScraper({
    showBrowser: false,
    companyId: companyType,
    startDate: startDate || sixMonthsAgo,
  })

  const scrapeResult = await scraper.scrape(credentials)
  if (!scrapeResult.success || typeof scrapeResult.accounts === 'undefined') throw new DataFetchingException()

  return scrapeResult.accounts
}

export default class FinancialDataController {
  @validate(FinancialDatumValidator, SCRAPERS.leumi.loginFields)
  public async leumi(ctx: HttpContextContract) {
    return await getData(ctx, CompanyTypes.leumi, SCRAPERS.leumi.loginFields)
  }
  @validate(FinancialDatumValidator, SCRAPERS.mizrahi.loginFields)
  public async mizrahi(ctx: HttpContextContract) {
    return await getData(ctx, CompanyTypes.mizrahi, SCRAPERS.mizrahi.loginFields)
  }
  @validate(FinancialDatumValidator, SCRAPERS.otsarHahayal.loginFields)
  public async otsarHahayal(ctx: HttpContextContract) {
    return await getData(ctx, CompanyTypes.otsarHahayal, SCRAPERS.otsarHahayal.loginFields)
  }
  @validate(FinancialDatumValidator, SCRAPERS.visaCal.loginFields)
  public async visaCal(ctx: HttpContextContract) {
    return await getData(ctx, CompanyTypes.visaCal, SCRAPERS.visaCal.loginFields)
  }
  @validate(FinancialDatumValidator, SCRAPERS.max.loginFields)
  public async max(ctx: HttpContextContract) {
    return await getData(ctx, CompanyTypes.max, SCRAPERS.max.loginFields)
  }
  @validate(FinancialDatumValidator, SCRAPERS.union.loginFields)
  public async union(ctx: HttpContextContract) {
    return await getData(ctx, CompanyTypes.union, SCRAPERS.union.loginFields)
  }
  @validate(FinancialDatumValidator, SCRAPERS.beinleumi.loginFields)
  public async beinleumi(ctx: HttpContextContract) {
    return await getData(ctx, CompanyTypes.beinleumi, SCRAPERS.beinleumi.loginFields)
  }
  @validate(FinancialDatumValidator, SCRAPERS.hapoalim.loginFields)
  public async hapoalim(ctx: HttpContextContract) {
    return await getData(ctx, CompanyTypes.hapoalim, SCRAPERS.hapoalim.loginFields)
  }
  @validate(FinancialDatumValidator, SCRAPERS.discount.loginFields)
  public async discount(ctx: HttpContextContract) {
    return await getData(ctx, CompanyTypes.discount, SCRAPERS.discount.loginFields)
  }
  @validate(FinancialDatumValidator, SCRAPERS.isracard.loginFields)
  public async isracard(ctx: HttpContextContract) {
    return await getData(ctx, CompanyTypes.isracard, SCRAPERS.isracard.loginFields)
  }
  @validate(FinancialDatumValidator, SCRAPERS.amex.loginFields)
  public async amex(ctx: HttpContextContract) {
    return await getData(ctx, CompanyTypes.amex, SCRAPERS.amex.loginFields)
  }
}
