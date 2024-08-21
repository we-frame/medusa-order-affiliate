<div align="center">
  <img src="https://raw.githubusercontent.com/we-frame/medusa-order-affiliate/main/media/medus-order-plugin-logo.png" alt="Magator Logo" width="320">
  <h1>Medusa Order Affiliate Plugin</h1>
</div>
<br>

This plugin allows you to integrate an affiliate system into your MedusaJS project. The plugin enables the creation and management of affiliate customers, allowing them to earn commissions based on order subtotals. It also includes PayPal integration for monthly payouts.

## Features

- **Affiliate as Customer**: Admin can mark a customer as an affiliate directly from the admin panel.
- **Commission Rate Management**: Admin can set and update the commission rate for each affiliate customer.
- **Affiliate Activation/Deactivation**: Admin can toggle the activeness of an affiliate customer.
- **Affiliate Commission Generation**: Affiliates earn commissions once an order's payment status is set to 'captured.'
- **Commission Calculation**: Commissions are based on the order's subtotal. For example, if an order includes two items priced at $10 and $20, the subtotal will be $30.
- **Payout Management**: Affiliates must provide a payment email to receive payouts. Payouts are released monthly via PayPal.

## Installation and Setup

To get started with the `medusa-order-affiliate` plugin, follow these steps:

#### 1. Install the plugin:

```bash
npm install npm i @weframetechsolutions/medusa-order-affiliate
```

#### 2. Modify the `medusa-config.js`:

Add the plugin configuration to your `medusa-config.js` as described earlier, [see](#Contributing).

#### 3. (Optional) Seed your database:

Run the seed command if you want to add some pre-existing data.

```bash
npm run seed
```

#### 4. Run Migrations:

This step is required as the plugin creates new fields in pre-existing entities and adds new entities.

```bash
npx medusa migrations run
```

#### 5. Start the Medusa server:

Finally, start your Medusa server.

```bash
npm run dev
```

## Configuration

After installing the plugin, you need to add it to your `medusa-config.js` file in the `plugins` section. The plugin requires several configuration options to function correctly:

```javascript
{
  resolve: "npm i @weframetechsolutions/medusa-order-affiliate",
  options: {
    enableUI: true, // Enable the admin UI for managing affiliates
    medusa_api_url: "<base-url-of-pluggedin-medusa>", // The base API endpoint of your Medusa server
    paypal_client_id: "<your-paypal-client-id>", // PayPal Client ID from your developer account
    paypal_client_secret: "<your-paypal-client-secret>", // PayPal Client Secret from your developer account
    paypal_api_url: "https://api-m.sandbox.paypal.com" // PayPal API URL (default is set to the sandbox environment)
  }
}
```

### Important Notes

- **`enableUI`**: This option is mandatory for the plugin to work properly. It enables the UI components necessary for managing affiliate customers in the Medusa admin panel.
- **`medusa_api_url`**: The base API URL of your Medusa server is required for the plugin to communicate with your Medusa backend.
- **PayPal Integration**:
  - Obtain your `paypal_client_id` and `paypal_client_secret` from your PayPal developer dashboard.
  - The `paypal_api_url` is set to the sandbox environment by default. Make sure to update it to the production URL (`https://api.paypal.com`) when deploying to a live environment.

## Usage

Once the plugin is installed and configured:

1. **Affiliate Management**:

   - Navigate to the Medusa admin panel.
   - Mark any customer as an affiliate.
   - Set or update their commission rate and activation status.

2. **Commission Generation**:

   - Commissions are automatically generated when an order's payment status changes to 'captured.'

3. **Payouts**:
   - Ensure that affiliates provide their payment email in their profile.
   - Payouts are released automatically at the end of each month.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/we-frame/medusa-order-affiliate/issues) if you want to contribute.

## License

This plugin is [MIT licensed](https://github.com/we-frame/medusa-order-affiliate/blob/main/LICENSE).
