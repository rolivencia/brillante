import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense(
    'Mzk4OTYzM0AzMjMwMmUzNDJlMzBRWTJmQThkc1lyZml5Q3d2M3pXMEM3V3BVM3lUREVwRFhaSDRCMWJCa1hVPQ==;Mzk4OTYzNEAzMjMwMmUzNDJlMzBYKzdwVDM2ZTN1ZkpiZjFNYzRZRUFtM0VCRDlVdGo5QW5IZEw5RnlPOFl3PQ==;Mgo+DSMBaFt/QHRqVVhjVFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQFhjQX9Rd0BnXH9fc3FTQWteUQ==;Mgo+DSMBPh8sVXJ0S0J+XE9HflRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3tTfkRhWHpadXRURWhUVE90Xw==;ORg4AjUWIQA/Gnt2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxWdk1iW35bdHFVR2RcVUV9XUI=;NRAiBiAaIQQuGjN/V0Z+WE9EaFxKVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35Rc0VrWH1fdXBQRmFYUkF1VEBd;Mzk4OTYzOUAzMjMwMmUzNDJlMzBNZTZxL1hac3l2aVlIdTVnMkU0WXNTbGtZQzlnSDMrQVBvUnltTUN6cEhjPQ==;Mzk4OTY0MEAzMjMwMmUzNDJlMzBjTER3N3FRVU44ZFZpRi9aL3pyZURQWkhlQWdXNThTQTY5QjVnTHJpVXBRPQ==;Mgo+DSMBMAY9C3t2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxWdk1iW35bdHFVR2VYVEZ9XUI=;Mzk4OTY0MkAzMjMwMmUzNDJlMzBhdFJickovR3BXbEFqQ2ZYODNDTmt0WTBJYnMzNnNMOVhFaGFjRkpvbjBZPQ==;Mzk4OTY0M0AzMjMwMmUzNDJlMzBtcmZzeVZ1aGxiMDRoM0Y1R1JsTHVObzJ0Uy94THEzVUkrQXRPSGhrMmw4PQ==;Mzk4OTY0NEAzMjMwMmUzNDJlMzBNZTZxL1hac3l2aVlIdTVnMkU0WXNTbGtZQzlnSDMrQVBvUnltTUN6cEhjPQ=='
);

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
