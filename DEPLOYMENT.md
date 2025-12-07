# Deployment Guide - Backend Setup

## Step 1: SendGrid Setup

1. **Create SendGrid Account**
   - Go to [sendgrid.com](https://sendgrid.com)
   - Sign up for free (100 emails/day)
   - Verify your email

2. **Create API Key**
   - Dashboard → Settings → API Keys
   - Click "Create API Key"
   - Name: "PDF to EPUB App"
   - Permissions: "Full Access"
   - Copy the API key (you won't see it again!)

3. **Verify Sender Email**
   - Settings → Sender Authentication
   - Verify a single sender email
   - Use this email as `FROM_EMAIL`

## Step 2: Vercel Deployment

1. **Install Vercel CLI** (optional, can use GitHub instead)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via CLI**
   ```bash
   cd c:\Users\Monster\Documents\pdf_to_epub
   vercel
   ```
   - Follow prompts
   - Choose project name
   - Deploy!

3. **OR Deploy via GitHub**
   - Push code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Vercel will auto-deploy

## Step 3: Set Environment Variables

1. **In Vercel Dashboard**
   - Go to your project
   - Settings → Environment Variables
   - Add:
     - `SENDGRID_API_KEY` = your_api_key
     - `FROM_EMAIL` = your_verified_email@domain.com

2. **Redeploy**
   - Deployments → Redeploy latest

## Step 4: Update Mobile App

1. **Get Vercel URL**
   - Copy your Vercel app URL (e.g., `https://pdf-to-epub.vercel.app`)

2. **Update API URL**
   - Create `.env` file in project root:
     ```
     REACT_APP_API_URL=https://your-app.vercel.app
     ```

3. **Rebuild App**
   ```bash
   npm run build
   npx cap sync
   ```

## Step 5: Test

1. **Test API Endpoint**
   - Open: `https://your-app.vercel.app/api/send-to-kindle`
   - Should see: "Method not allowed" (means it's working!)

2. **Test from Mobile App**
   - Convert a PDF
   - Click "Kindle'a Gönder"
   - Check if email arrives

## Troubleshooting

**Email not sending:**
- Check SendGrid API key is correct
- Verify FROM_EMAIL in SendGrid
- Check Vercel logs for errors

**API not found:**
- Ensure `vercel.json` is in project root
- Redeploy after adding env variables

**CORS errors:**
- Add CORS headers to API (already included in code)

## Cost
- **SendGrid:** Free (100 emails/day)
- **Vercel:** Free (hobby plan)
- **Total:** $0/month 🎉
