"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = 'https://ypusprohxwmkmpixmdbb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwdXNwcm9oeHdta21waXhtZGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ3MzQ5MzUsImV4cCI6MTk4MDMxMDkzNX0.pW_NBI09_OW1SgeMLwFTb_6nMeN3b7NdFU0r9LYBny4';
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
exports.default = supabase;
//# sourceMappingURL=index.js.map