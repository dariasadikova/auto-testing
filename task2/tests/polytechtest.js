import { ScheduleManager } from '../pages/polytechpage.js';
import { describe, it, before, after } from 'mocha';
import { assert } from 'chai';

describe('Schedule Functionality Tests', async () => {
    const scheduleManager = new ScheduleManager();

    before(async () => {
        await scheduleManager.navigateToHomepage();
    });

    after(async () => {
        await scheduleManager.closeBrowser();
    });

    it('opens schedule section', async () => {
        await scheduleManager.goToScheduleSection();
    });

    it('launches the schedule viewer', async () => {
        await scheduleManager.launchScheduleViewer();
    });

    it('enters group details for search', async () => {
        await scheduleManager.enterGroupDetails();
    });

    it('confirms the presence of the group in search results', async () => {
        assert.equal(await scheduleManager.confirmGroupExistence(), true);
    });

    it('selects the group’s specific schedule', async () => {
        await scheduleManager.selectGroupSchedule();
    });

    it('checks if today’s date is highlighted on the schedule', async () => {
        assert.equal(await scheduleManager.validateCurrentDayHighlight(), true);
    });
});