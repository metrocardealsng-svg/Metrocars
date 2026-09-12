const {test,expect}=require('@playwright/test');
for (const width of [360,390,768,1366]) {
 test(`buyer journey at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:844});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8080');
  await expect(page.locator('#vehicleGrid article')).toHaveCount(6);
  await expect(page.locator('.nav-link span')).toHaveText('06');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  await expect(page.locator('[data-scene]:visible')).toHaveCount(1);
  await page.locator('#inventory').scrollIntoViewIfNeeded();
  for(const img of await page.locator('#vehicleGrid img').all()) {
   await img.scrollIntoViewIfNeeded();
   await expect.poll(()=>img.evaluate(i=>i.complete&&i.naturalWidth>0)).toBeTruthy();
  }
  await page.getByRole('button',{name:'SUVs',exact:true}).click();
  await expect(page.locator('#vehicleGrid article')).toHaveCount(3);
  await page.locator('#resetFilters').click();
  await page.locator('#carSearch').fill('Corolla');
  await expect(page.locator('#vehicleGrid article')).toHaveCount(1);
  await page.locator('#carSearch').fill('no-such-car');
  await expect(page.locator('#emptyState')).toBeVisible();
  await page.locator('#emptyReset').click();
  await page.locator('#budgetFilter').selectOption('15000000');
  await expect(page.locator('#vehicleGrid article')).toHaveCount(3);
  await page.locator('#sortFilter').selectOption('price-low');
  await expect(page.locator('#vehicleGrid article').first()).toContainText('Corolla');
  await page.locator('#resetFilters').click();
  await page.getByRole('button',{name:'Save Infiniti QX56 2011',exact:true}).click();
  await page.locator('#savedTab').click();
  await expect(page.locator('#vehicleGrid article')).toHaveCount(1);
  await page.getByRole('button',{name:'Unsave Infiniti QX56 2011',exact:true}).click();
  await expect(page.locator('#emptyState')).toBeVisible();
  await page.locator('#emptyReset').click();
  await page.getByRole('button',{name:'View Infiniti QX56 2011 details',exact:true}).click();
  await expect(page.locator('#vehicleDialog')).toBeVisible();
  await expect(page.locator('#vehicleDialog img')).toHaveCount(2);
  await page.getByRole('button',{name:'Enquire about this car',exact:false}).click();
  await expect(page.locator('#enquiryVehicle')).toHaveValue('Infiniti QX56 2011');
  await page.locator('#enquiryName').fill('Test Buyer');
  await page.locator('#enquiryForm button[type=submit]').click();
  await expect(page.locator('#enquiryDialog')).toBeVisible();
  const href=await page.locator('#openWhatsApp').getAttribute('href');
  expect(href).toContain('https://wa.me/2349030914429?text=');
  expect(decodeURIComponent(href)).toContain('Infiniti QX56 2011');
  await expect(page.locator('#alternateWhatsApp')).toHaveAttribute('href',/^https:\/\/wa.me\/2349073965030\?text=/);
  await page.screenshot({path:`test-results/enquiry-${width}.png`});
  await page.getByRole('button',{name:'Close enquiry preview'}).click();
  await page.getByRole('link',{name:'MetroCarDeals home',exact:true}).click();
  await expect(page.locator('[data-scene]:visible')).toHaveCount(1);
  expect(errors).toEqual([]);
 });
}
test('reduced motion keeps hero usable without frame downloads',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 const frames=[];page.on('request',r=>{if(r.url().includes('/frames/'))frames.push(r.url())});
 await page.goto('http://127.0.0.1:8080');
 await expect(page.locator('#vehicleGrid article')).toHaveCount(6);
 expect(frames).toHaveLength(0);
 await expect(page.locator('[data-scene]:visible')).toHaveCount(1);
});
