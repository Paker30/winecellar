import React from 'react';
import { Trans, withTranslation } from 'react-i18next';

function Loading() {
    return (
        <div><Trans i18nKey="loading" /></div>
    );
}

export default withTranslation()(Loading);
