let SS88Tools = {
    previousUrl: window.location.href,
    accountData: [],
    serverData: [],
    domainsData: [],
    websitesData: [],
    emailsData: [],
    databasesData: [],
    serversData: [],
    orgsData: [],
    tabTimeout: 0
}

function init() {

    if(localStorage.session!==undefined) {

        if(SS88Tools.accountData.roles.includes('Owner')) {

            setupTabs()
            getServerData()

        }

    }

    setupObserver()

}

document.addEventListener('DOMContentLoaded', ()=>{

    getAccountData().then(init);

}, false);

function setupObserver() {

    const observer = new MutationObserver(function(mutations) {

        if (location.href !== SS88Tools.previousUrl) {

            SS88Tools.previousUrl = location.href;

            [].forEach.call(document.querySelectorAll('.ss88_tab'), function(tabs) {

                tabs.classList.remove('selected');

            });

            setupTabs();

        }

    });

    const config = {subtree: true, childList: true};
    observer.observe(document, config);

}

async function setupTabs() {

    SS88Tools.tabTimeout = setInterval(setupTab, 100);

}

function setupTab() {

    const sidebar = document.querySelectorAll('#dashboard-spine');

    if(document.querySelector('.ss88_tab') != null) { return false; }

    if(sidebar.length && document.querySelector('.ss88_tab') == null && SS88Tools.accountData.roles.includes('Owner')) {

        const last_link = document.querySelector('#dashboard-spine > div:last-child a:last-child');

        if(last_link==undefined) { clearInterval(SS88Tools.tabTimeout); return; }

        injectCSS()

        const cloned = last_link.cloneNode(true);
        if(cloned.childNodes[2]!=undefined) cloned.childNodes[2].innerHTML = 'Tools';
        cloned.classList.remove('selected');
        cloned.setAttribute('href', '/tools');
        cloned.setAttribute('title', 'Tools');
        cloned.querySelector('i').innerHTML = `<svg enable-background="new 0 0 64 64" height="64px" id="Layer_1" version="1.1" viewBox="0 0 64 64" width="64px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path fillrule="evenodd" d="M62.37,54.759L42.63,35.015c-2.614-2.614-1.352-4.534-1.352-4.534l-0.012-0.013   c0.873-1.798,0.579-4.015-0.911-5.508l-7.684-7.684c-1.886-1.887-4.944-1.887-6.831,0l-1.174,1.172l-0.125,0.126   c0,0-0.539,1.072,1.918,1.215l0.001,0.003c0,0,1.13,0.096,2.234,1.2l2.72,2.72c0.994,0.993,1.021,2.029,0.975,2.495   c-0.227,1.28-0.817,2.507-1.808,3.495c-0.981,0.984-2.201,1.569-3.471,1.797c-0.563,0.052-1.634-0.045-2.82-1.231l-2.062-2.065   c-1.299-1.299-1.575-2.975-1.575-2.975h-0.003c-0.503-2.279-1.191-1.569-1.191-1.569l-1.3,1.3   c-1.886,1.885-1.886,4.944-0.001,6.831l7.683,7.682c1.57,1.571,3.947,1.814,5.79,0.771l0.014,0.015c0,0,1.691-1.069,3.967,1.209   l20.486,20.489c0,0,2.49,2.445,4.839,0.097l1.938-1.938C63.53,59.383,64.917,57.306,62.37,54.759z" /><path d="M40.965,52.071c-1.226-1.458-3.194-0.554-3.194-0.554l-0.005-0.013c-0.168,0.057-0.333,0.124-0.504,0.177   c-0.054,0.02-0.088,0.042-0.151,0.067c-2.688,0.99-2.713,3.034-2.713,3.034v2.397c-0.038,2.04-1.666,2.398-2.508,2.452h-0.975   c-2.092,0.042-2.467-1.237-2.521-1.921v-2.76c0-2.538-2.833-3.239-2.833-3.239l0.009-0.012c-1.534-0.454-2.985-1.099-4.348-1.873   c-0.057-0.025-0.102-0.04-0.164-0.071c-2.293-1.149-4.002,0.472-4.002,0.472l-1.949,1.949c-1.361,1.356-2.368,0.724-2.737,0.389   l-0.157-0.159l-0.006-0.008h-0.001l-1.601-1.601c-0.001-0.003-0.003-0.003-0.006-0.006c-1.253-1.251,0.377-2.972,0.594-3.189   l1.901-1.899c0.001,0,0.001-0.005,0.001-0.005c1.465-1.465,0.314-3.746,0.314-3.746s0.016-0.003,0.019-0.003   c-0.731-1.328-1.335-2.735-1.766-4.223c-0.014-0.039-0.03-0.064-0.045-0.105c-0.965-2.668-3.399-2.623-3.446-2.623l-1.847,0.008   c-2.162,0.003-2.551-1.402-2.609-2.141l-0.005-1.489c0.013-0.615,0.236-2.355,2.423-2.374c0.001,0,0.001,0,0.001,0l2.367-0.01   c0,0,2.231,0.104,3.023-2.273c0.011-0.03,0.026-0.046,0.036-0.076c0.475-1.751,1.16-3.413,2.05-4.942c0,0,0-0.001,0-0.003   c1.13-2.273-0.484-3.978-0.695-4.185l-1.61-1.608c0,0,0-0.001-0.003-0.004c-1.553-1.553-0.489-2.899-0.12-3.283l0.839-0.839   c0,0,1.77-1.874,3.644,0c0.003,0,0.003,0.001,0.005,0.003l1.83,1.83c0.345,0.327,1.753,1.472,3.773,0.491   c0.008-0.003,0.011-0.003,0.018-0.006c1.3-0.736,2.698-1.314,4.153-1.758c0.039-0.016,0.06-0.035,0.104-0.053   c2.344-0.921,2.781-2.366,2.846-3.113V6.441c0.013-0.457,0.188-2.256,2.289-2.256h1.314c0,0,2.397-0.08,2.397,2.589v2.062   c0.013,0.588,0.218,2.547,2.478,3.344c0.004,0.001,0.004,0.003,0.01,0.005c1.368,0.377,2.673,0.907,3.911,1.547l0.013-0.011   c0,0,2.82,1.75,4.949-0.377l1.424-1.424c0.066-0.066,1.993-1.932,3.434-0.491c0.003,0.001,0.006,0.003,0.006,0.006l1.18,1.177   c0,0,1.431,1.742-0.371,3.545l-1.595,1.595c0,0-1.663,1.704-0.455,4.286c0.021,0.045,0.021,0.072,0.04,0.116   c0.736,1.341,1.317,2.776,1.745,4.279c0.004-0.003,0.02-0.016,0.02-0.016s0.516,2.59,2.826,2.584l2.242-0.01h0.06h0.101   c0.065-0.001,2.738-0.044,2.744,2.481l0.007,1.061v0.003v0.261c-0.022,0.625-0.32,2.187-2.805,2.196l-2.15,0.007   c-1.681,0.016-2.517,1.393-2.885,2.269c-0.14,0.383-0.467,1.625,0.719,2.792l0.305,0.3c0.006,0.005,0.01,0.008,0.014,0.013   c1.772,1.9,3.037-0.761,3.037-0.761c0.804-1.336,1.979-1.604,2.608-1.647h3.279c0.997,0,1.805-0.807,1.805-1.805v-8.325   c0-0.995-0.808-1.805-1.805-1.805h-3.128c-2.453,0-3.072-2.276-3.072-2.276s-0.016,0.004-0.021,0.006   c-0.365-1.05-0.78-2.079-1.277-3.061c0-0.003,0-0.005-0.003-0.008c-0.827-1.82,0.724-3.371,0.809-3.452l1.996-2   c0.704-0.705,0.704-1.847,0-2.553l-5.886-5.886c-0.707-0.704-1.849-0.703-2.553,0.001L46.7,8.25   c-2.264,2.278-4.387,1.178-4.387,1.178l-0.003,0.006c-0.814-0.39-1.647-0.742-2.503-1.047c-0.04-0.019-0.068-0.036-0.109-0.053   c-1.893-0.775-2.142-2.715-2.166-3.501V2.734c0-0.997-0.809-1.805-1.805-1.805h-8.665c-0.995,0-1.805,0.808-1.805,1.805v2.609   c0,2.613-2.21,3.009-2.21,3.009l0.013,0.013c-0.956,0.341-1.893,0.722-2.795,1.17c-0.016,0.006-0.025,0.003-0.041,0.009   c-1.802,0.798-2.798,0.016-3.051-0.229l-0.062-0.062l-0.009-0.011h-0.001L14.66,6.796c-0.706-0.704-1.849-0.704-2.553-0.003   l-5.892,5.884c-0.704,0.706-0.706,1.847,0,2.552l1.956,1.958c0,0,1.696,1.635,0.855,3.471c0,0.003,0,0.003,0,0.003   c-0.487,0.957-0.896,1.958-1.258,2.98c-0.025,0.053-0.049,0.094-0.074,0.156c-0.75,1.831-2.143,2.18-2.888,2.234H1.96   c-0.997,0-1.805,0.81-1.805,1.805v8.325c0,0.998,0.808,1.805,1.805,1.805h3.24c1.833,0,2.315,1.691,2.315,1.691   s0.013-0.031,0.021-0.046c0.375,1.167,0.803,2.31,1.336,3.395c-0.001,0-0.011,0.005-0.011,0.005s1.145,1.941-0.138,3.224v0.003   l-2.519,2.518c-0.704,0.704-0.704,1.85,0,2.551l5.887,5.886c0.706,0.706,1.847,0.706,2.551,0l2.266-2.262l0.005-0.007l0.101-0.099   c0.311-0.296,1.402-1.101,3.507-0.232c0.022,0.011,0.035,0.014,0.055,0.021c0.803,0.38,1.629,0.726,2.475,1.023l-0.01,0.009   c0,0,2.217,0.66,2.217,2.887v2.732c0,0.998,0.81,1.805,1.805,1.805h8.665c0.996,0,1.805-0.807,1.805-1.805v-2.992   c0.04-0.66,0.333-1.906,1.886-2.517c0.06-0.025,0.098-0.046,0.145-0.067c0.6-0.209,1.176-0.464,1.756-0.712   c1.401-0.778,0.102-2.364,0.102-2.364L40.965,52.071z" fillrule="evenodd" /></g></svg>`;
        cloned.querySelector('svg').classList.add(last_link.querySelector('svg').classList[0], last_link.querySelector('svg').classList[1]);
        cloned.classList.add('ss88_tab');

        if(window.location.pathname == '/tools') {

            let BreadCrumb = [].slice.call(document.querySelectorAll('div[data-qa="text"]')).find(el => el.textContent == 'Not found');
            if(!BreadCrumb) return;
            
            BreadCrumb.innerHTML = 'Tools';
        
            let ContentBox = document.querySelector('h1').parentElement.parentElement.parentElement;
            ContentBox.classList.add('ss88_box');
            ContentBox.innerHTML = '<h1>Tools</h1>';
            ContentBox.innerHTML += `
            
                <div class="ss88_menu">
                    <button name="Domains">Domains</button>
                    <button name="Emails">Emails</button>
                    <button name="Databases">Databases</button>
                    <button name="Servers">Servers</button>
                    <button name="DNSBL">DNSBL</button>
                </div>

                <div class="lds-ripple"><div></div><div></div></div>

            `

                getDomains().then(getOrgs).then(getWebsites).then(() => {

                    document.querySelector('.lds-ripple').remove();
                    cloned.classList.add('selected');
                    setupToolsPage();

                })
        }

        last_link.after(cloned);

        clearInterval(SS88Tools.tabTimeout);
        return true;

    }

}

function setupToolsPage() {

    let ContentBox = document.querySelector('.ss88_box');
    let DomainCount = EmailCount = DatabaseCount = ServersCount = 0;

    //Domains List
    ContentBox.innerHTML += `
    <div class="ss88_card ss88_domains" data-for="Domains">
        <table>
            <thead>
                <th>Domain</th>
                <th>Status</th>
                <th>Server</th>
                <th width="100">Size</th>
                <th>Mail Routing</th>
                <th>PHP</th>
                <th>Backup</th>
                <th>Email</th>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    `

    SS88Tools.websitesData.forEach(W => {

        var D = SS88Tools.domainsData.filter(function(v,i) {
            return v['id'] === W.domain.id;
        })[0];

        document.querySelector('.ss88_card.ss88_domains table tbody').innerHTML += `
        
            <tr>
                <td><a href="/websites/${ W.id }" target="_blank">${ W.domain.domain }</a></td>
                <td class="cen"><svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" class=" css-o3fw7f" data-qa="icon-svg" style="${ W.status=='active' ? 'fill:#24a148;' : 'fill:red' }"><g fill-rule="evenodd"><path d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z"></path><path d="M8 13.5a5.5 5.5 0 110-11 5.5 5.5 0 010 11z"></path></g></svg></td>
                <td>${ W.appServerName } </td>
                <td data-sortvalue="${ W.size }">${ formatBytes(W.size) }</td>
                <td>${ D!==undefined ? (D.localRemote=='remote' ? 'Remote' : 'Local') : '' }</td>
                <td>${ W.phpVersion!==null ? W.phpVersion.replace('php', '').replace(/(.{1})/,"$1.") : 'None' }</td>
                <td>${ W.backupServerName!==undefined ? W.backupServerName : 'None' } ${ W.pendingBackup!==null ? '<abbr title="Pending Backup">(PB)</abbr>' : '' }</td>
                <td>${ W.emailServerName!==undefined ? W.emailServerName : 'None' }</td>
            </tr>

        `

        DomainCount++;
    });

    // DNSBL
    ContentBox.innerHTML += `

    <div class="ss88_dnsbl" data-for="DNSBL">
    
        <div class="ss88_card">
            <div class="flex">
                <select name="dnsbls" style="padding: 10px;"></select>
                <button name="submit" style="background: black;color: white;padding: 10px 20px;cursor: pointer;">Check</button>
            </div>
        </div>
        
        <div class="ss88_results" style="width:100%;display: flex;flex-flow: row wrap;justify-content: space-between;">
        <p>The DNSBL connects to a third party script. It does not save any details, nor IP addresses when data is transferred.</p>
        </div>

    </div> 
    `

    // Emails
    ContentBox.innerHTML += `
    <div class="ss88_card ss88_emails" data-for="Emails">
        <table>
            <thead>
                <th>Mailbox</th>
                <th>Status</th>
                <th>Aliases</th>
                <th>Forwards</th>
                <th>Autoresponders</th>
                <th width="150">Quota</th>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    `

    SS88Tools.emailsData.forEach(E => {

        var D = SS88Tools.domainsData.filter(function(v,i) {
            return v['id'] === E.domainId;
        })[0];

        document.querySelector('.ss88_card.ss88_emails table tbody').innerHTML += `
        
            <tr>
                <td>${ E.address }</td>
                <td class="cen"><svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" class=" css-o3fw7f" data-qa="icon-svg" style="${ E.status=='active' ? 'fill:#24a148;' : 'fill:red' }"><g fill-rule="evenodd"><path d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z"></path><path d="M8 13.5a5.5 5.5 0 110-11 5.5 5.5 0 010 11z"></path></g></svg></td>
                <td>${ E.aliases.length } </td>
                <td>${ E.forwardersCount } </td>
                <td>${ E.autorespondersCount } </td>
                <td data-sortvalue="${ E.quota.usage / E.quota.total * 100 }"><progress max="${ E.quota.total }" value="${ E.quota.usage }" title="${ E.quota.total===0 ? 'âˆž' : formatBytes(E.quota.usage) + ' / ' + formatBytes(E.quota.total) }" class="${(E.quota.usage / E.quota.total * 100 > 85) ? 'red' : ''}"> </progress></td>
            </tr>

        `

        EmailCount++;
    });

    // Databases
    ContentBox.innerHTML += `
    <div class="ss88_card ss88_dbs" data-for="Databases">
        <table>
            <thead>
                <th>Name</th>
                <th>Server</th>
                <th width="100">Size</th>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    `

    SS88Tools.databasesData.forEach(DB => {

        var S = SS88Tools.serverData.filter(function(v,i) {
            return v['id'] === DB.serverId;
        })[0];

        document.querySelector('.ss88_card.ss88_dbs table tbody').innerHTML += `
        
            <tr>
                <td>${ DB.name }</td>
                <td>${ S.friendlyName } </td>
                <td data-sortvalue="${ DB.size }">${ formatBytes(DB.size) }</td>
            </tr>

        `

        DatabaseCount++;
    });

    // Servers
    ContentBox.innerHTML += `
    <div class="ss88_card ss88_servers" data-for="Servers">
        <table>
            <thead>
                <th>Name</th>
                <th>Hostname</th>
                <th>Status</th>
                <th>IP(s)</th>
                <th width="150">Disk</th>
                <th>App</th>
                <th>DB</th>
                <th>Backup</th>
                <th>DNS</th>
                <th>Email</th>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    `

    SS88Tools.serversData.forEach(Serv => {

        //var S = SS88Tools.serverData.filter(function(v,i) {
        //    return v['id'] === DB.serverId;
        //})[0];

        document.querySelector('.ss88_card.ss88_servers table tbody').innerHTML += `
        
            <tr>
                <td>${ Serv.friendlyName } ${ Serv.isControlPanel ? '<abbr title="Control Panel">(CP)</abbr>' : '' }</td>
                <td>${ Serv.hostname } </td>
                <td class="cen"><svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" class=" css-o3fw7f" data-qa="icon-svg" style="${ Serv.status=='online' ? 'fill:#24a148;' : 'fill:red' }"><g fill-rule="evenodd"><path d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z"></path><path d="M8 13.5a5.5 5.5 0 110-11 5.5 5.5 0 010 11z"></path></g></svg></td>
                <td>${ Serv.ips.map(u => u.ip).join(', ') } </td>
                <td data-sortvalue="${ Serv.disks[0].usage.used / Serv.disks[0].usage.total * 100 }"><progress max="${ Serv.disks[0].usage.total }" value="${ Serv.disks[0].usage.used }" title="${ formatBytes(Serv.disks[0].usage.used) + ' / ' + formatBytes(Serv.disks[0].usage.total) }" class="${(Serv.disks[0].usage.used / Serv.disks[0].usage.total * 100 > 85) ? 'red' : ''}"> </progress></td>
                <td class="cen">${ Serv.roles.application ? 'âœ…' : 'âŒ' } </td>
                <td class="cen">${ Serv.roles.database ? 'âœ…' : 'âŒ' } </td>
                <td class="cen">${ Serv.roles.backup ? 'âœ…' : 'âŒ' } </td>
                <td class="cen">${ Serv.roles.dns ? 'âœ…' : 'âŒ' } </td>
                <td class="cen">${ Serv.roles.email ? 'âœ…' : 'âŒ' } </td>
            </tr>

        `

        ServersCount++;
    });


    document.querySelector('button[name="Domains"]').innerHTML += ` <span>(${DomainCount})</span>`;
    document.querySelector('button[name="Emails"]').innerHTML += ` <span>(${EmailCount})</span>`;
    document.querySelector('button[name="Databases"]').innerHTML += ` <span>(${DatabaseCount})</span>`;
    document.querySelector('button[name="Servers"]').innerHTML += ` <span>(${ServersCount})</span>`;


    const dnsblSelect = document.querySelector('.ss88_dnsbl select[name="dnsbls"]');

    SS88Tools.serverData.forEach((server)=>{

        dnsblSelect.options[dnsblSelect.options.length] = new Option(server.friendlyName + ' (' + server.ips[0].ip + ')', server.ips[0].ip);

    });

    document.querySelector('.ss88_dnsbl button').addEventListener('click', (event) => {
        
        event.target.setAttribute('disabled', true);
        doDNSBL(document.querySelector('.ss88_dnsbl .ss88_results'), dnsblSelect.value);

    });


    // Table Sorts
    const getCellValue = (tr, idx) => parseInt(tr.children[idx].dataset.sortvalue) || tr.children[idx].innerText || tr.children[idx].textContent;
    const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
        v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
        )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
    
    document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
        const table = th.closest('table');
        const tbody = table.querySelector('tbody');
        Array.from(tbody.querySelectorAll('tr'))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
            .forEach(tr => tbody.appendChild(tr) );
    })));

    toolsPageClicks()
    document.querySelector('.ss88_menu>button:first-child').click();

}

function toolsPageClicks() {

    [].forEach.call(document.querySelectorAll('.ss88_menu>button'), function(button) {

        button.addEventListener('click', btn => {

            [].forEach.call(document.querySelectorAll('.ss88_menu>button'), function(button) {

                button.classList.remove('active');
                document.querySelector(`div[data-for="${button.name}"]`).style.display='none';


            });

            btn.target.classList.add('active');
            document.querySelector(`div[data-for="${btn.target.name}"]`).style.display='block';

        });

    });

}

async function getAccountData() {

    let cpAccData = localStorage.getItem('impersonation');

    if(cpAccData==null) {

        const response = await fetch('/api/login/memberships');

        if (response.status >= 200 && response.status <= 299) {

            const jsonResponse = await response.json();
            SS88Tools.accountData = jsonResponse.memberships[0];

        } else {

            console.log(response.status, response.statusText);

        }
    }
    else {

        SS88Tools.accountData = JSON.parse(cpAccData).member;

    }
}

async function getServerData() {

    const response = await fetch('/api/servers');

    if (response.status >= 200 && response.status <= 299) {

        const jsonResponse = await response.json();
        SS88Tools.serverData = jsonResponse.items;

        SS88Tools.serverData.forEach(Serv => {

            getServerByID(Serv.id);
    
        });

    } else {

        console.log(response.status, response.statusText);

    }
}

async function getDomains() {

    const response = await fetch(`/api/orgs/${SS88Tools.accountData.orgId}/domains?limit=999`);

    if (response.status >= 200 && response.status <= 299) {

        const jsonResponse = await response.json();
        SS88Tools.domainsData = jsonResponse.items;

    } else {

        console.log(response.status, response.statusText);

    }
}

async function getWebsites() {

    const response = await fetch(`/api/orgs/${SS88Tools.accountData.orgId}/websites?limit=999&sortBy=domain&sortOrder=asc&recursion=infinite`);

    if (response.status >= 200 && response.status <= 299) {

        const jsonResponse = await response.json();
        SS88Tools.websitesData = jsonResponse.items;

    } else {

        console.log(response.status, response.statusText);

    }
}

async function getOrgs() {

    const response = await fetch(`/api/orgs/${SS88Tools.accountData.orgId}/customers?limit=999&recursive=true`);

    if (response.status >= 200 && response.status <= 299) {

        const jsonResponse = await response.json();
        SS88Tools.orgsData = jsonResponse.items;

        SS88Tools.orgsData.forEach(Org => {

            if(Org.websitesCount>0) {

                getDomainsByOrg(Org.id);
                getEmailsByOrg(Org.id);
                getDatabasesByOrg(Org.id);

            }
    
        });

    } else {

        console.log(response.status, response.statusText);

    }
}

async function getServerByID(servID) {

    const response = await fetch(`/api/servers/${servID}`);

    if (response.status >= 200 && response.status <= 299) {

        const jsonResponse = await response.json();

        SS88Tools.serversData.push(jsonResponse);

    } else {

        console.log(response.status, response.statusText);

    }
}

async function getDomainsByOrg(orgID) {

    const response = await fetch(`/api/orgs/${orgID}/domains?limit=999`);

    if (response.status >= 200 && response.status <= 299) {

        const jsonResponse = await response.json();

        jsonResponse.items.forEach(item => { SS88Tools.domainsData.push(item); });

    } else {

        console.log(response.status, response.statusText);

    }
}

async function getEmailsByOrg(orgID) {

    const response = await fetch(`/api/orgs/${orgID}/emails?limit=999&sortBy=address&recursive=true&includeInternal=false`);

    if (response.status >= 200 && response.status <= 299) {

        const jsonResponse = await response.json();

        jsonResponse.items.forEach(item => { 
            
            if(item.emailKind=='internal' || item.mailboxId==undefined) return;

            SS88Tools.emailsData.push(item);
        
        });

    } else {

        console.log(response.status, response.statusText);

    }
}

async function getDatabasesByOrg(orgID) {

    const response = await fetch(`/api/orgs/${orgID}/mysql-dbs?limit=999&sortBy=name`);

    if (response.status >= 200 && response.status <= 299) {

        const jsonResponse = await response.json();

        jsonResponse.items.forEach(item => {
            
            if(SS88Tools.databasesData.filter(db => db.id == item.id).length==0)
                SS88Tools.databasesData.push(item);
        
        });

    } else {

        console.log(response.status, response.statusText);

    }
}

function doDNSBL(content, ip) {

    var start = new Date();
    var finish = 0;

    content.innerHTML = '';
    if(document.querySelector('p.ss88_style')) document.querySelector('p.ss88_style').remove();
    content.insertAdjacentHTML("beforebegin", `
    <p class="ss88_style">Checking <span name="ipaddress"></span> in <span name="ilength">0</span> of <span name="ittl">0</span> servers... <span name="finished" style="color:green"></span></p>
    `);

    let msg = actualMsg = '';
    let totalItems = -1;
    let items = [];

    const streamUrl = 'https://enhance.ss88.us/dnsbl/?ip=' + encodeURIComponent(ip)
    const evtSource = new EventSource(streamUrl)

    evtSource.addEventListener('header', (e) => {

      const header = JSON.parse(e.data)
      totalItems = header.total_items
      actualMsg = header.msg

      document.querySelector('.ss88_dnsbl span[name="ittl"]').innerHTML = totalItems;
      document.querySelector('.ss88_dnsbl span[name="ipaddress"]').innerHTML = ip;

    }, false)

    evtSource.addEventListener('item', (e) => {

      const item = JSON.parse(e.data)
      items.push(item)
      document.querySelector('.ss88_dnsbl span[name="ilength"]').innerHTML = item.cnt;

      let listed = item.listed ? '<div class="text-center">Listed</div>' : '<div class="text-center">Not Listed</div>';
      let listedcss = item.listed ? 'yes' : 'no';

        let moreHTML = `
        <div class="ss88_card ss88_result flex ${listedcss}">
        <div>${item.host}</div>
        <div>${item.time}</div>
      </div>
        `

        if(item.listed)
            document.querySelector('.ss88_dnsbl .ss88_results').insertAdjacentHTML("afterbegin", moreHTML);
        else
            document.querySelector('.ss88_dnsbl .ss88_results').innerHTML += moreHTML;

    }, false)

    evtSource.addEventListener('close', () => {
      evtSource.close()

      finish = new Date() - start;
      document.querySelector('.ss88_dnsbl span[name="finished"]').innerHTML = 'Finished in ' + ((finish % 60000) / 1000).toFixed(0) + ' seconds.';
      document.querySelector('.ss88_dnsbl button').removeAttribute('disabled')

    }, false)

}

async function doServerLogs(content, serverID) {

    const response = await fetch(`/api/servers/${serverID}/logs?flush=true`);

    if (response.status >= 200 && response.status <= 299) {

        content.innerHTML = '';

        const jsonResponse = await response.json();

        content.innerHTML = jsonResponse;

    } else {

        content.innerHTML = response.status + ' error.';
        console.log(response.status, response.statusText);

    }

}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function injectCSS() {

    var FontFamily = window.getComputedStyle(document.querySelector('.ui-text-hoverable'), null ).getPropertyValue('font-family');

    var CSS = `
.ss88_box, .ss88_box * {
    font-family:${FontFamily};
}
.ss88_box h1 {
    font-weight:300;
    margin:0;
}
.ss88_menu {
    background-color:white;
    width:100%;
    display:flex;
    margin-top:20px;
}
.ss88_menu>button {
    padding:20px;
    cursor:pointer;
    border-bottom:2px solid transparent;
    transition:all 0.3s ease-in-out;
}
.ss88_menu>button.active, .ss88_menu>button:hover {
    border-bottom:2px solid black;
}
.ss88_menu>button>span {
    font-size: 12px;
    margin-left:5px;
    opacity: 0.5;
}
.ss88_box .ss88_card {
    border-radius: 2px;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 16px;
    margin-left: 0px;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 8px 0px;
    padding: 16px;
    margin-top: 35px;
}
.ss88_card table {
    font-size:13px;
    width:100%;
}
.ss88_card table thead {
    background-color: black;
    color: white;
    cursor:pointer;
}
.ss88_card table th, .ss88_card table td {
    padding:10px;
    text-align:left;
}
.ss88_card table :not(thead) tr:hover { 
    background-color: #ebebeb;
}
.ss88_card table a {
    color:black;
}


.ss88_dnsbl, .ss88_serverlogs {
    width:100%;
}
.ss88_box .flex {
    display:flex;
    width:100%;
    justify-content: space-between;
}
.ss88_dnsbl button:disabled,
.ss88_dnsbl button[disabled]{
    cursor:none;
    opacity:0.1;
}


.ss88_card a[target="_blank"]::after {
    content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==);
    margin: 0px 3px 0px 5px;
}


.ss88_dnsbl .ss88_result { width: 32.33%; flex-direction:row; position:relative; margin-top:0; font-size:14px; }
.ss88_dnsbl .ss88_result.no, .ss88_dnsbl .ss88_result.yes { border-left:3px solid #24a148; }
.ss88_dnsbl .ss88_result.yes { border-left:3px solid red; }
.ss88_dnsbl span[name="ipaddress"] { font-weight:bold; }


.ss88_card table td.cen {
    text-align:center;
}

@media screen and(max-width:768px) {

    .ss88_dnsbl .ss88_result {

        width:48%;

    }

}
@media screen and(max-width:500px) {

    .ss88_dnsbl .ss88_result {

        width:100%;

    }
    
}

.ss88_box progress {
	background-color: #f3f3f3;
	border: 0;
	width: 100%;
	height: 18px;
	border-radius: 3px;
    position:relative;
}
.ss88_box progress::-webkit-progress-bar {
	background-color: #f3f3f3;
	border-radius: 3px;
}
.ss88_box progress::-webkit-progress-value {
	background: #cdeb8e;
	background: -moz-linear-gradient(top,  #cdeb8e 0%, #a5c956 100%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#cdeb8e), color-stop(100%,#a5c956));
	background: -webkit-linear-gradient(top,  #cdeb8e 0%,#a5c956 100%);
	background: -o-linear-gradient(top,  #cdeb8e 0%,#a5c956 100%);
	background: -ms-linear-gradient(top,  #cdeb8e 0%,#a5c956 100%);
	background: linear-gradient(to bottom,  #cdeb8e 0%,#a5c956 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cdeb8e', endColorstr='#a5c956',GradientType=0 );
	border-radius: 3px;
}
.ss88_box progress.red::-webkit-progress-value {
	background: #eb8e8e;
	background: -moz-linear-gradient(top,  #eb8e8e 0%, #c95656 100%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#c95656), color-stop(100%,#c95656));
	background: -webkit-linear-gradient(top,  #eb8e8e 0%,#c95656 100%);
	background: -o-linear-gradient(top,  #eb8e8e 0%,#c95656 100%);
	background: -ms-linear-gradient(top,  #eb8e8e 0%,#c95656 100%);
	background: linear-gradient(to bottom,  #eb8e8e 0%,#c95656 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#eb8e8e', endColorstr='#c95656',GradientType=0 );
	border-radius: 3px;
}
.ss88_box progress::before {
    content: attr(title);
    text-align:center;
    position: absolute;
    width: 100%;
    font-size:10px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.5;
    line-height: 1;
}





.lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    margin: auto;
    margin-top: 50px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid #000;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    4.9% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    5% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
  
    `;

    var style = document.createElement("style")
    style.innerText = CSS
    document.head.appendChild(style)

}