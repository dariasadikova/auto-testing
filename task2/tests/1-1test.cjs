import TodoPage from "../pages/1-1page.js";
import { describe, before, after, it } from 'mocha';
import { assert } from 'chai';

const handleErrors = (action, handler) => {
    return async () => {
        try {
            await action();
        } catch (error) {
            console.error(error);
            if (handler) {
                await handler();
            }
        }
    };
};

describe("Todo App Tests", function() {
    let todoPage;
    let totalItems = 5;
    let itemsRemaining = 5;

    before(async () => {
        todoPage = new TodoPage();
        await todoPage.load();
    });

    after(async () => {
        if (todoPage) {
            await todoPage.shutdown();
        }
    });
    

    it("Validates remaining tasks", handleErrors(async () => {
        for (let i = 1; i <= totalItems; i++) {
            const expectedText = `${itemsRemaining} of ${totalItems} remaining`;
            assert.isTrue(await todoPage.checkRemainingCount(expectedText), "Remaining tasks mismatch expected value");
            const active = await todoPage.toggleItem(i);
            assert.isTrue(active, `Item ${i} should be active.`);
            itemsRemaining--;
        }
    }, async () => await todoPage.takeScreenshot('error')));

    it("Adds and validates a new item", handleErrors(async () => {
        const newItemText = "Item Sadikova";
        await todoPage.addNewItem(newItemText);
        totalItems++;
        itemsRemaining++;
        const expectedText = `${itemsRemaining} of ${totalItems} remaining`;
        assert.isTrue(await todoPage.checkRemainingCount(expectedText), "Remaining tasks mismatch expected value");
    }, async () => await todoPage.takeScreenshot('error')));
});




