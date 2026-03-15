# 📦 SECTION 3 - PART 1: Page Files (Error Pages)

**Location:** `src/app/pages/` folder

**Total files in Section 3:** 22 files (split into 4 parts for easier handling)

**Part 1:** 2 error/utility pages

---

## 📂 FIRST: Create the `src/app/pages` folder

1. Right-click on `src/app` folder
2. Click "New Folder"
3. Name it `pages`

---

## FILE 1/22: `src/app/pages/ErrorBoundary.tsx`

**Instructions:**
1. Right-click on `src/app/pages` folder
2. New File → Name it `ErrorBoundary.tsx`
3. Paste the content below
4. Save (⌘ + S)

**Content:**

```typescript
import { useRouteError, Link } from "react-router";
import { AlertTriangle, Home } from "lucide-react";

export default function ErrorBoundary() {
  const error = useRouteError() as Error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-2xl mb-2 text-gray-900">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full hover:shadow-lg transition-shadow"
        >
          <Home className="h-4 w-4" />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
```

✅ **File 1 complete!**

---

## FILE 2/22: `src/app/pages/NotFound.tsx`

**Instructions:**
1. Right-click on `src/app/pages` folder
2. New File → Name it `NotFound.tsx`
3. Paste the content below
4. Save (⌘ + S)

**Content:**

```typescript
import { Link } from "react-router";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-6xl mb-2 text-gray-900">404</h1>
        <h2 className="text-2xl mb-2 text-gray-900">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full hover:shadow-lg transition-shadow"
        >
          <Home className="h-4 w-4" />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
```

✅ **File 2 complete!**

---

## ✅ PART 1 COMPLETE! (2/22 files)

**Progress:** 13 of 137 total files created

---

## 🚀 NEXT STEP

**Reply:** "Part 1 done! Give me Part 2"

**Part 2 will include:** Legal pages (4 files)
- PrivacyPolicy.tsx
- TermsOfService.tsx
- RefundPolicy.tsx
- FAQ.tsx
