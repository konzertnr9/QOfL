# Quick Open for Linguists
Chrome extension to quickly open various pages related to a Polyglot task from the context menu.

## Features
From Polyglot task screen:
- Open Polyglot project (task list)
- Open LQE report (Arbitration UI)
- Open DevSite page (live page corresponding to the task)
- Open QM queries (by project number)
- Search in QM (by selected string)
- Open Help article (by selected article number / path)

From \*.google.com / \*.android.com / \*.tensorflow.org:
- Open EN page (hl=en)

## FAQ
**Q:** Devsite page / Help article does not open correctly.  
**A:** Not all products are currently supported due to the lack of official mapping between products and DevSite / Help URLs. Please let me know the product name you're working on and the URL of your intended page and I will update the code.

**Q:** Multiple tabs pop up when I choose to open a DevSite page / Help article.  
**A:** Some products have multiple corresponding DevSite / Help article URLs. The extension tries to figure out the correct URL to use by looking into the project description but when there is no information available it opens all possible URLs in separate tabs.
